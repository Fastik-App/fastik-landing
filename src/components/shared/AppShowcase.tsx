import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The hero centerpiece: the real desktop app in a bare, gradient-framed window
 * sitting on a violet glow, with the iPhone screenshot overlapping the
 * bottom-right corner at a slight tilt. The whole composition fades into the
 * page at the bottom so the UI reads as continuing past the fold.
 */
export function AppShowcase({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-5xl", className)}>
      {/* Violet glow behind the window — the "emits light" cue. */}
      <div
        aria-hidden
        className="absolute -inset-x-16 -top-16 bottom-0 -z-10 rounded-[3rem] blur-3xl"
        style={{ background: "radial-gradient(45% 45% at 50% 40%, rgba(102,94,215,0.45), transparent 70%)" }}
      />

      {/* Desktop window */}
      <div className="gradient-frame app-window-shadow relative overflow-hidden rounded-2xl bg-[#09090b]">
        <Image
          src="/images/app-desktop.png"
          alt="Fastik desktop app — studio dashboard"
          width={2880}
          height={1800}
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="block w-full"
        />
      </div>

      {/* iPhone overlapping the corner — deeper shadow so it reads as closer. */}
      <div
        className="absolute -bottom-8 -right-2 hidden w-[168px] rotate-[4deg] rounded-[2rem] bg-[#0c0c0f] p-1.5 ring-1 ring-white/10 shadow-[0_50px_90px_-20px_rgba(0,0,0,0.75)] sm:block md:-right-4 md:-bottom-12 md:w-[214px]"
      >
        <div className="relative overflow-hidden rounded-[1.6rem]">
          {/* Dynamic-island bar */}
          <div className="absolute left-1/2 top-2 z-10 h-4 w-14 -translate-x-1/2 rounded-full bg-black/80" />
          <Image
            src="/images/app-mobile.png"
            alt="Fastik iPhone app"
            width={1170}
            height={2532}
            sizes="214px"
            className="block w-full"
          />
        </div>
      </div>
    </div>
  );
}
