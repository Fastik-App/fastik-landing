/**
 * The waitlist welcome email.
 *
 * Ported from the original NestJS MailService.sendWaitlistWelcome so the
 * design people already received stays the same. Two changes: the logo is
 * built from SITE_URL rather than hardcoded (it pointed at an apex that was
 * dead until recently), and an unsubscribe line was added — the Terms page
 * promises one, and bulk mail legally needs it.
 */

const BRAND = "#7c6eff";

export const WAITLIST_SUBJECT = "You're in! Welcome to Fastik";

export function waitlistWelcomeHtml(siteUrl: string): string {
  const site = siteUrl.replace(/\/$/, "");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Fastik Waitlist</title>
</head>
<body style="margin:0;padding:0;background-color:#000;">
  <div style="width:100%;background-color:#000;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:64px 24px;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:540px;">
            <tr>
              <td align="center" style="padding-bottom:48px;">
                <img src="${site}/assets/fastik-logo-white.png" width="110" alt="Fastik"/>
              </td>
            </tr>
            <tr>
              <td style="text-align:center;padding-bottom:48px;">
                <h1 style="color:#ffffff;font-size:32px;margin:0 0 12px;">
                  The future of speed is <span style="color:${BRAND};">coming.</span>
                </h1>
                <p style="color:#a1a1aa;font-size:16px;margin:0;">
                  You've successfully reserved your spot.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#0a0a0a;border-radius:16px;padding:30px;">
                <p style="color:${BRAND};font-weight:bold;margin:0;">01. Reserved Access</p>
                <p style="color:#ffffff;margin:4px 0 0;">Your position is secured.</p>
                <p style="color:${BRAND};font-weight:bold;margin:20px 0 0;">02. Direct Notification</p>
                <p style="color:#ffffff;margin:4px 0 0;">You'll receive a link soon.</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:40px;">
                <a href="${site}" style="background:${BRAND};color:white;padding:14px 40px;border-radius:10px;text-decoration:none;display:inline-block;">
                  Explore Platform
                </a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:48px;">
                <p style="color:#52525b;font-size:12px;line-height:1.6;margin:0;">
                  You're receiving this because you joined the Fastik waitlist.<br/>
                  <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#71717a;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}
