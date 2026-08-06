import { NextResponse } from "next/server";

/**
 * The Mac download button's real destination. fastik-desktop is a private
 * repo, so its release assets aren't publicly fetchable — GitHub's normal
 * `/releases/latest/download/<name>` shortcut 404s for anonymous visitors.
 *
 * Instead this asks the GitHub API for the latest release (server-side, with
 * a token), which hands back a short-lived, unauthenticated Azure Blob URL
 * for the asset. We redirect the browser straight there. The .dmg's bytes
 * never pass through this server — only two small API calls do.
 */

const OWNER = "Fastik-App";
const REPO = "fastik-desktop";
// Uploaded under this exact name on every release (see fastik-desktop's
// release process), so this route never needs updating for a version bump.
const ASSET_NAME = "Fastik-mac-arm64.dmg";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.FASTIK_DESKTOP_RELEASE_TOKEN;
  if (!token) {
    return new NextResponse(
      "Download is temporarily unavailable. Try again shortly, or email hello@fastik.io.",
      { status: 503 },
    );
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const release = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`,
      { headers, cache: "no-store" },
    );
    if (!release.ok) throw new Error(`releases/latest ${release.status}`);

    const data = (await release.json()) as {
      assets: { id: number; name: string }[];
    };
    const asset = data.assets.find((a) => a.name === ASSET_NAME);
    if (!asset) throw new Error(`no asset named ${ASSET_NAME} on latest release`);

    // Asking for this asset with an octet-stream Accept header, and refusing
    // to auto-follow, is what makes GitHub hand back the signed URL in
    // `Location` instead of streaming the file through this request.
    const signed = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases/assets/${asset.id}`,
      { headers: { ...headers, Accept: "application/octet-stream" }, redirect: "manual" },
    );
    const location = signed.headers.get("location");
    if (!location) throw new Error(`no redirect from asset ${asset.id} (status ${signed.status})`);

    return NextResponse.redirect(location, { status: 307 });
  } catch (err) {
    console.error("[download/mac]", err);
    return new NextResponse(
      "Download is temporarily unavailable. Try again shortly, or email hello@fastik.io.",
      { status: 503 },
    );
  }
}
