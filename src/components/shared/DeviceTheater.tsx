"use client";

import { cn } from "@/lib/utils";
import { INTEGRATIONS } from "@/components/shared/IntegrationLogos";

/**
 * Device hero: a Blender-rendered MacBook running Fastik, held as a static
 * beauty shot (this replaced the old scroll-scrubbed opening sequence). The
 * integration logos hover around it as glass chips on gentle, staggered
 * floats, so "connects your tools" still reads as one dimensional scene.
 */
export function DeviceTheater() {
  // Resting placements + per-chip float timing so the cloud breathes on its own.
  const chipPlacements = [
    { cls: "left-[2%] top-[16%]", dur: "7s", delay: "0s" },
    { cls: "right-[3%] top-[12%]", dur: "8.5s", delay: "0.6s" },
    { cls: "left-[6%] bottom-[24%]", dur: "6.5s", delay: "1.1s" },
    { cls: "right-[1%] bottom-[40%]", dur: "9s", delay: "0.3s" },
    { cls: "left-[15%] top-[6%]", dur: "7.8s", delay: "1.4s" },
    { cls: "right-[16%] top-[4%]", dur: "8s", delay: "0.9s" },
  ];

  return (
    <section className="relative w-full py-24 md:py-32" aria-label="Fastik running on Mac">
      <div className="mx-auto flex w-full flex-col items-center">
        <p className="mb-6 text-xs uppercase tracking-[0.16em] text-white/40">
          Your whole studio, on one screen
        </p>

        <div className="relative w-full max-w-5xl px-4">
          {/* Soft violet stage glow behind the laptop */}
          <div
            aria-hidden
            className="absolute inset-x-8 top-1/4 bottom-8 -z-10 rounded-full blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 55%, rgba(102,94,215,0.28), transparent 70%)" }}
          />

          <img
            src="/images/laptop-hero.webp"
            alt="Fastik running on a MacBook"
            className="fk-float mx-auto block w-full will-change-transform"
          />

          {/* Integration chips hovering around the laptop */}
          {INTEGRATIONS.map(({ name, glow, Logo }, i) => {
            const c = chipPlacements[i % chipPlacements.length];
            return (
              <div
                key={name}
                title={name}
                className={cn(
                  "fk-float absolute hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.09] bg-white/[0.05] backdrop-blur-xl md:h-14 md:w-14",
                  c.cls,
                )}
                style={{
                  animationDuration: c.dur,
                  animationDelay: c.delay,
                  boxShadow: `0 14px 40px -10px rgba(${glow}, 0.5)`,
                }}
              >
                <Logo />
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/40">
          Gmail · Google Calendar · WhatsApp · Outlook · iCloud · Apple Calendar — already connected
        </p>
      </div>
    </section>
  );
}
