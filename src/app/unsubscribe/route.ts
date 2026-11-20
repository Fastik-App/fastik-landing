import { NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";

/**
 * The unsubscribe endpoint named in the welcome email's List-Unsubscribe
 * header and footer link.
 *
 * Answers both verbs on purpose. GET is the human clicking the footer link
 * and gets a page back. POST is RFC 8058 one-click: Gmail and Outlook render
 * their own "Unsubscribe" button next to the sender and call this directly,
 * expecting an empty 200 — that button is a large part of why a header-based
 * unsubscribe helps deliverability at all.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function unsubscribe(token: string | null): Promise<"ok" | "invalid" | "error"> {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  if (!token || !secret || !apiKey) return "invalid";

  const email = verifyUnsubscribeToken(token, secret);
  if (!email) return "invalid";

  try {
    const { error } = await new Resend(apiKey).contacts.update({ email, unsubscribed: true });
    if (error) {
      console.error("[unsubscribe] contacts.update failed", error);
      return "error";
    }
    return "ok";
  } catch (err) {
    console.error("[unsubscribe] threw", err);
    return "error";
  }
}

function page(title: string, body: string, status: number) {
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} · Fastik</title>
<style>
  html,body{height:100%;margin:0;background:#000;color:#fff;
    font:15px/1.6 -apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
    display:flex;align-items:center;justify-content:center;text-align:center}
  .box{max-width:30rem;padding:2rem}
  h1{font-size:1.4rem;margin:0 0 .6rem;font-weight:600}
  p{margin:0;color:#a1a1aa}
  a{display:inline-block;margin-top:1.5rem;background:#7c6eff;color:#fff;
    padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:500}
</style>
<div class="box"><h1>${title}</h1><p>${body}</p><a href="https://fastik.io">Back to Fastik</a></div>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t");
  const result = await unsubscribe(token);

  if (result === "ok") {
    return page("You're unsubscribed", "You won't receive any more emails from the Fastik waitlist.", 200);
  }
  if (result === "invalid") {
    return page("This link isn't valid", "It may have been altered or truncated. Email hello@fastik.io and we'll remove you.", 400);
  }
  return page("Something went wrong", "We couldn't update your preferences just now. Email hello@fastik.io and we'll do it manually.", 500);
}

export async function POST(request: Request) {
  // One-click: mail clients want an empty body and a 200/202, nothing else.
  const token = new URL(request.url).searchParams.get("t");
  const result = await unsubscribe(token);
  return new NextResponse(null, { status: result === "ok" ? 200 : result === "invalid" ? 400 : 500 });
}
