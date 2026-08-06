import type { Metadata, Viewport } from "next";
import { inter, instrumentSerif } from "@/lib/fonts";
import Script from "next/script";
import "../index.css";
import Providers from "@/components/providers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fastik.io";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0d17" },
    { media: "(prefers-color-scheme: light)", color: "#0f0d17" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FASTIK — The All-in-One Workspace for Creative Teams",
    template: "%s | FASTIK",
  },
  description:
    "One place for files, feedback, progress, clients and team — without chaos. The workspace creatives have been waiting for.",
  keywords: [
    "creative collaboration",
    "video feedback",
    "creative workspace",
    "project management",
    "team collaboration",
    "file sharing",
    "time-stamped feedback",
    "creative teams",
    "videographers",
    "editors",
    "motion designers",
    "freelancers",
    "agencies",
  ],
  authors: [{ name: "FASTIK" }],
  creator: "FASTIK",
  publisher: "FASTIK",
  applicationName: "FASTIK",
  alternates: {
    canonical: siteUrl,
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "FASTIK",
    title: "FASTIK — The All-in-One Workspace for Creative Teams",
    description:
      "One place for files, feedback, progress, clients and team — without chaos. Built by creatives, for creatives.",
      images: [
        {
          url: "/assets/hero-dashboard.webp",
          width: 1200,
          height: 930,
          alt: "FASTIK — Creative Collaboration Platform",
        },
      ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FASTIK — The All-in-One Workspace for Creative Teams",
    description:
      "One place for files, feedback, progress, clients and team — without chaos. Built by creatives, for creatives.",
      images: ["/assets/hero-dashboard.webp"],
    creator: "@fastik",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FASTIK",
    url: siteUrl,
    logo: `${siteUrl}/assets/fastik-logo-white.png`,
    description: "The All-in-One Workspace for Creative Teams",
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <style>
          {`
            html, body {
              min-height: 100%;
              background: #09090b;
              color: #fff;
              font-family: 'Inter', sans-serif;
            }
            .text-premium { color: #665ed7; }
            .text-sweep { color: #3a118f; }
            .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(8px); }
          `}
        </style>
      </head>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>

        {/* Umami Analytics — proxied to bypass ad blockers */}
        <Script
          defer
          src="/stats/script.js"
          data-website-id="2bdda89a-405a-4b5c-bba6-c0797116e741"
          data-host-url="https://fastik.io/stats"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
