import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WAITLIST_SUBJECT, waitlistWelcomeHtml } from "@/lib/waitlist-email";
import { unsubscribeUrl } from "@/lib/unsubscribe-token";
import { checkSignupRate, clientIp } from "@/lib/rate-limit";

/**
 * Waitlist signup.
 *
 * Answers on the same path the old NestJS backend did (`/api/subscribers`),
 * so WaitlistCTA and lib/api.ts work unchanged. That backend is gone; Resend
 * now holds the list and sends the welcome mail, which keeps the whole site
 * self-contained on Vercel with no database to run.
 *
 * Error bodies use `message` because lib/http.ts reads that field and shows
 * it to the user as a toast — so whatever is written here is user-facing.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR =
  "Something went wrong on our end. Please try again in a moment.";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  // Segment groups signups so a launch broadcast can target them; topic
  // carries the subscription preference that drives the unsubscribe link.
  // Resend replaced Audiences with these — audienceId is deprecated.
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const topicId = process.env.RESEND_TOPIC_ID;
  const from = process.env.WAITLIST_FROM_EMAIL;
  // Where replies land. Kept in env rather than in source because this repo
  // is public and it is a personal inbox.
  const replyTo = process.env.WAITLIST_REPLY_TO;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fastik.io";
  const unsubSecret = process.env.UNSUBSCRIBE_SECRET;

  if (!apiKey || !from) {
    // Misconfiguration is ours, not the visitor's — don't blame their input.
    console.error("[subscribers] missing RESEND_API_KEY / WAITLIST_FROM_EMAIL");
    return NextResponse.json({ message: GENERIC_ERROR }, { status: 503 });
  }

  // Before anything that costs money. Every send draws on a 3,000/month
  // quota, so the endpoint cannot stay open to a loop.
  const rate = checkSignupRate(clientIp(request));
  if (!rate.ok) {
    return NextResponse.json(
      { message: "Too many signups from this connection. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  let email: string;
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ message: "Enter a valid email" }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Enter a valid email" }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  // Resend reports a repeat create as success without saying the contact
  // already existed, so re-submitting the form would send a second welcome
  // email. Look first: someone already subscribed gets the same reassuring
  // response and no duplicate mail.
  let alreadySubscribed = false;
  let wasUnsubscribed = false;
  try {
    const { data } = await resend.contacts.get({ email });
    if (data) {
      alreadySubscribed = true;
      // They opted out at some point and are now filling the form again.
      // That submission is a fresh request to be on the list, so honour it
      // and send the welcome mail — but flip the flag first, or the topic
      // gate below will refuse the send.
      wasUnsubscribed = data.unsubscribed === true;
    }
  } catch {
    // Lookup failure is not a reason to turn a visitor away. Fall through and
    // create; the worst case is the duplicate email this check exists to stop.
  }

  try {
    if (alreadySubscribed && wasUnsubscribed) {
      const { error } = await resend.contacts.update({ email, unsubscribed: false });
      if (error) {
        console.error("[subscribers] resubscribe failed", error);
        return NextResponse.json({ message: GENERIC_ERROR }, { status: 502 });
      }
    } else if (!alreadySubscribed) {
      const { error } = await resend.contacts.create({
        email,
        unsubscribed: false,
        ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
        ...(topicId ? { topics: [{ id: topicId, subscription: "opt_in" as const }] } : {}),
      });

      if (error) {
        console.error("[subscribers] contacts.create failed", error);
        return NextResponse.json({ message: GENERIC_ERROR }, { status: 502 });
      }
    }
  } catch (err) {
    console.error("[subscribers] contact write threw", err);
    return NextResponse.json({ message: GENERIC_ERROR }, { status: 502 });
  }

  // Already on the list and still subscribed: nothing to send. The form says
  // "you're on the list" either way, which is true and is what they wanted
  // to hear — telling them they already signed up helps nobody.
  if (alreadySubscribed && !wasUnsubscribed) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  // The address is on the list at this point. A failed welcome email is worth
  // logging but not worth telling the visitor they failed to sign up.
  try {
    const unsubUrl = unsubSecret ? unsubscribeUrl(siteUrl, email, unsubSecret) : `${siteUrl}/unsubscribe`;
    const { error } = await resend.emails.send({
      from,
      to: email,
      ...(replyTo ? { replyTo } : {}),
      // Gating, not templating: Resend refuses the send if this contact has
      // opted out of the topic. It does NOT expand the unsubscribe
      // placeholder — that is Broadcasts/Automations only, which is why the
      // link below is one we mint and host ourselves.
      ...(topicId ? { topicId } : {}),
      subject: WAITLIST_SUBJECT,
      html: waitlistWelcomeHtml(siteUrl, unsubUrl),
      // RFC 8058 one-click. Gmail and Outlook render their own unsubscribe
      // button from these, which is the part that helps deliverability.
      headers: {
        "List-Unsubscribe": `<${unsubUrl}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (error) console.error("[subscribers] welcome email failed", error);
  } catch (err) {
    console.error("[subscribers] welcome email threw", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
