import crypto from "node:crypto";

/**
 * Signed unsubscribe links.
 *
 * Resend's {{{RESEND_UNSUBSCRIBE_URL}}} placeholder only expands in Broadcasts
 * and Automations — it is delivered literally by the send API, so transactional
 * mail has to carry its own link. Resend's own guidance for this case is to
 * host the unsubscribe URL yourself and declare it with List-Unsubscribe.
 *
 * The address is signed rather than looked up so the link works statelessly and
 * nobody can unsubscribe a stranger by editing the query string.
 */

const SEP = ".";

function sign(email: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(`unsub:${email}`).digest("base64url");
}

export function unsubscribeToken(email: string, secret: string): string {
  const addr = Buffer.from(email.toLowerCase()).toString("base64url");
  return `${addr}${SEP}${sign(email.toLowerCase(), secret)}`;
}

/** The address this token authorises, or null if it was tampered with. */
export function verifyUnsubscribeToken(token: string, secret: string): string | null {
  const [addr, sig] = token.split(SEP);
  if (!addr || !sig) return null;

  let email: string;
  try {
    email = Buffer.from(addr, "base64url").toString("utf8").toLowerCase();
  } catch {
    return null;
  }
  if (!email) return null;

  const expected = sign(email, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return email;
}

export function unsubscribeUrl(siteUrl: string, email: string, secret: string): string {
  return `${siteUrl.replace(/\/$/, "")}/unsubscribe?t=${unsubscribeToken(email, secret)}`;
}
