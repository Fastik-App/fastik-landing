"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DOWNLOADS } from "@/lib/constants";

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

const PRIMARY =
  "bg-gradient-to-r from-[#3a118f] to-[#665ed7] text-white ring-1 ring-white/10 shadow-[0_10px_40px_-10px_rgba(102,94,215,0.7)] hover:from-[#4a1aaf] hover:to-[#7b74e0] hover:shadow-[0_14px_50px_-10px_rgba(102,94,215,0.85)]";
const SECONDARY =
  "bg-white/[0.05] text-white/90 ring-1 ring-white/[0.10] hover:bg-white/[0.09] hover:ring-white/20";

function StoreButton({
  href,
  emphasis,
  eyebrow,
  label,
}: {
  href: string;
  emphasis: "primary" | "secondary";
  eyebrow: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-2.5 rounded-xl px-5 transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#665ed7]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]",
        emphasis === "primary" ? PRIMARY : SECONDARY,
      )}
    >
      <AppleGlyph className="w-5 h-5 shrink-0 -mt-0.5" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-normal text-white/60">{eyebrow}</span>
        <span className="text-sm font-semibold tracking-tight">{label}</span>
      </span>
    </a>
  );
}

/**
 * The launched-product download CTA: two matched buttons (Mac + iPhone) plus a
 * quiet web-app link. On an iOS device the iPhone button is promoted to the
 * primary slot; both slots keep the same size so the emphasis swap after mount
 * never shifts layout.
 */
export function DownloadButtons({
  className,
  showWeb = true,
}: {
  className?: string;
  showWeb?: boolean;
}) {
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    setIos(isIOS);
  }, []);

  const mac = (
    <StoreButton href={DOWNLOADS.mac} emphasis={ios ? "secondary" : "primary"} eyebrow="Download for" label="macOS" />
  );
  const iphone = (
    <StoreButton href={DOWNLOADS.ios} emphasis={ios ? "primary" : "secondary"} eyebrow="Download for" label="iPhone" />
  );

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {ios ? (
          <>
            {iphone}
            {mac}
          </>
        ) : (
          <>
            {mac}
            {iphone}
          </>
        )}
      </div>
      <p className="text-xs text-white/40">macOS 13+ · Apple silicon &amp; Intel · Free 14-day trial, no card</p>
      {showWeb && (
        <a
          href={DOWNLOADS.web}
          className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 text-sm font-medium text-white/75 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.07] hover:text-white active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 opacity-70" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
          </svg>
          Open the web app
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      )}
    </div>
  );
}
