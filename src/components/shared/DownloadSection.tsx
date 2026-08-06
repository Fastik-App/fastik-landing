import Image from "next/image";
import { FadeSection } from "@/components/shared/FadeSection";
import { DownloadButtons } from "@/components/shared/DownloadButtons";

/**
 * Cross-platform close: the desktop app and the iPhone app standing side by
 * side on a shared floor shadow, with the download CTA repeated so getting the
 * app is always one glance away. Replaces the old waitlist/countdown.
 */
export function DownloadSection({ id = "download" }: { id?: string }) {
  return (
    <FadeSection id={id} className="relative py-24 px-6 overflow-hidden">
      {/* Ambient grid + violet pool, matching the other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, #09090b 100%)" }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl md:text-[3.5rem] leading-[0.95] tracking-[-0.06em]">
          <span className="text-premium">Your studio,</span>{" "}
          <span className="italic font-serif text-sweep">in your pocket.</span>
        </h2>
        <p className="mt-4 text-white/50 max-w-xl mx-auto font-light leading-relaxed">
          Review cuts, reply to clients, and check the day&apos;s shoots from anywhere. The same studio, native on macOS and iPhone.
        </p>

        {/* Device family — bottoms aligned on one shared floor shadow */}
        <div className="relative mt-14 flex items-end justify-center gap-4 sm:gap-8">
          {/* Shared floor shadow */}
          <div
            aria-hidden
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-24 rounded-[100%] bg-black/60 blur-2xl"
          />

          {/* Desktop */}
          <div className="gradient-frame app-window-shadow relative w-full max-w-2xl overflow-hidden rounded-xl bg-[#09090b]">
            <Image
              src="/images/app-desktop.png"
              alt="Fastik on macOS"
              width={2880}
              height={1800}
              sizes="(max-width: 768px) 70vw, 672px"
              className="block w-full"
            />
          </div>

          {/* iPhone */}
          <div className="relative w-[110px] sm:w-[168px] shrink-0 rounded-[1.6rem] sm:rounded-[2rem] bg-[#0c0c0f] p-1 sm:p-1.5 ring-1 ring-white/10 shadow-[0_40px_80px_-24px_rgba(0,0,0,0.7)]">
            <div className="relative overflow-hidden rounded-[1.3rem] sm:rounded-[1.6rem]">
              <div className="absolute left-1/2 top-1.5 z-10 h-3 w-10 -translate-x-1/2 rounded-full bg-black/80" />
              <Image
                src="/images/app-mobile.png"
                alt="Fastik on iPhone"
                width={1170}
                height={2532}
                sizes="168px"
                className="block w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <DownloadButtons />
        </div>
      </div>
    </FadeSection>
  );
}
