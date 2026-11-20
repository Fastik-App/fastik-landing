import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WAITLIST_SUBJECT, waitlistWelcomeHtml } from "@/lib/waitlist-email";

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

  if (!apiKey || !from) {
    // Misconfiguration is ours, not the visitor's — don't blame their input.
    console.error("[subscribers] missing RESEND_API_KEY / WAITLIST_FROM_EMAIL");
    return NextResponse.json({ message: GENERIC_ERROR }, { status: 503 });
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

  try {
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
      ...(topicId ? { topics: [{ id: topicId, subscription: "opt_in" as const }] } : {}),
    });

    // Resend treats a repeat signup as success. Someone re-submitting their
    // address should be reassured, not told they already did it — but they
    // shouldn't get a second welcome email either, and Resend doesn't tell us
    // whether the contact was new. Sending again is the lesser annoyance.
    if (error) {
      console.error("[subscribers] contacts.create failed", error);
      return NextResponse.json({ message: GENERIC_ERROR }, { status: 502 });
    }
  } catch (err) {
    console.error("[subscribers] contacts.create threw", err);
    return NextResponse.json({ message: GENERIC_ERROR }, { status: 502 });
  }

  // The address is on the list at this point. A failed welcome email is worth
  // logging but not worth telling the visitor they failed to sign up.
  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      ...(replyTo ? { replyTo } : {}),
      // Sending "to a topic" is what makes Resend expand
      // {{{RESEND_UNSUBSCRIBE_URL}}} and honour opt-outs. Without it the
      // placeholder is delivered literally and the unsubscribe link is dead —
      // which is exactly what happened on the first send.
      ...(topicId ? { topicId } : {}),
      subject: WAITLIST_SUBJECT,
      html: waitlistWelcomeHtml(siteUrl),
    });
    if (error) console.error("[subscribers] welcome email failed", error);
  } catch (err) {
    console.error("[subscribers] welcome email threw", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
