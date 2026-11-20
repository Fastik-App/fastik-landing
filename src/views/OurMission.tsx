"use client";

import { useState, useEffect } from "react";
import { Layers, Shuffle, Lightbulb, Rocket, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaitlistCTA } from "@/components/shared/WaitlistCTA";

const milestones = [
  {
    icon: Layers,
    title: "Creatives were pushed into the wrong tools",
    body: "For years, creative work has been managed with tools that were never built for it.\n\nSpreadsheets. Ticket systems. Generic project managers.\n\nSystems made for operations and corporate workflows — not for the way creative work actually happens.\n\nSo creatives adapted. Even when the tools didn't really fit.",
    accent: "#665ed7",
  },
  {
    icon: Shuffle,
    title: "Tool chaos became the norm",
    body: "To make things work, creatives started stacking tools.\n\nFiles in one place. Feedback somewhere else. Timelines in another platform. Messages across WhatsApp, email, and Slack.\n\nSwitching between tools slowly became part of the job.\n\nAnd with every new tool, focus disappeared a little more.",
    accent: "#7b74e0",
  },
  {
    icon: Lightbulb,
    title: "The realization",
    body: "Creative work moves differently.\n\nIt's visual. It evolves through feedback. It needs version control. It needs flow.\n\nThe tools around it should support that process — not interrupt it.\n\nBut most systems were never designed with this in mind.",
    accent: "#7b74e0",
  },
  {
    icon: Rocket,
    title: "Fastik: a different approach",
    body: "Fastik was created to change that.\n\nNot another tool to add to the stack. But a workspace built specifically for creative production.\n\nWhere files, feedback, communication, and progress live together.\n\nSo creatives can focus on the work — not the systems around it.",
    accent: "#665ed7",
  },
  {
    icon: Globe,
    title: "Our mission",
    body: "Our mission is to give creative work the system it deserves.\n\nOne place where projects, feedback, reviews, scheduling, and communication come together.\n\nNo more jumping between tools. No more lost context. No more broken workflows.\n\nJust a workspace that finally moves at the speed of creative work.",
    accent: "#7b74e0",
  },
];

/* ─────────────────────────── hooks ─────────────────────────── */

function useRoadmapProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);
  return progress;
}

/* ─────────────────────────── sub-components ─────────────────────── */

function MilestoneCard({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const isLeft = index % 2 === 0;
  const ref = useScrollReveal(index * 80, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  return (
    <div className={cn("relative flex items-start gap-0 md:gap-16", isLeft ? "md:flex-row" : "md:flex-row-reverse")}>
      <div
        ref={ref}
        className="flex-1 max-w-xl"
        style={{
          opacity: 0,
          transform: "translateY(40px) scale(0.96)",
          filter: "blur(6px)",
          transition:
            "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease-out",
        }}
      >
        <div className={cn("rounded-3xl p-7 md:p-8 relative overflow-hidden group", glass)}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative"
            style={{ background: `${milestone.accent}15` }}
          >
            <milestone.icon className="w-5 h-5" style={{ color: milestone.accent }} />
          </div>
          <h3 className="text-lg md:text-xl leading-tight mb-3 text-white/95">
            {milestone.title}
          </h3>
          <div className="text-sm text-white/45 leading-relaxed space-y-3">
            {milestone.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:block flex-1 max-w-xl" />
    </div>
  );
}

function RoadmapNode({ index, total, progress }: { index: number; total: number; progress: number }) {
  const nodeProgress = index / (total - 1);
  const isActive = progress >= nodeProgress * 0.75 - 0.05;

  return (
    <div
      className={cn(
        "w-4 h-4 rounded-full border-2 transition-all duration-700 relative z-10",
        isActive
          ? "border-[#7b74e0] bg-[#7b74e0] shadow-[0_0_20px_rgba(123,116,224,0.5)]"
          : "border-white/20 bg-[#09090b]"
      )}
    >
      {isActive && <span className="absolute inset-0 rounded-full animate-ping bg-[#7b74e0]/30" />}
    </div>
  );
}

/* ─────────────────────────── page component ─────────────────────── */

export default function OurMission() {
  const progress = useRoadmapProgress();
  const heroContentRef = useScrollReveal(200, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans selection:bg-primary/30">

      {/* ── NAV ── */}
      <Navbar activePage="our-mission" ctaTarget="mission-cta" />

      <main>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 md:pb-24 flex flex-col items-center text-center px-6">
        <div
          ref={heroContentRef}
          style={{
            opacity: 0,
            transform: "translateY(30px) scale(0.98)",
            filter: "blur(4px)",
            transition:
              "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s, filter 0.8s ease-out 0.2s",
          }}
        >
          <div className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs text-white/60", glass)}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7b74e0] animate-pulse" />
            Our Mission
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] max-w-5xl tracking-[-0.06em] mx-auto">
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent block">
              Our mission is building
            </span>
            <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent block">
              systems that adapt to
            </span>
            <span className="block italic font-serif bg-gradient-to-r from-[#7b74e0] via-[#a78bfa] to-[#3a118f] bg-clip-text text-transparent px-1">
              creative work.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            Follow the journey from tool chaos to a unified creative ecosystem — and understand why we built Fastik.
          </p>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-16">
        {/* Vertical line (desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
          <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
          <div
            className="absolute top-0 left-0 w-full rounded-full transition-[height] duration-100 ease-linear"
            style={{
              height: `${progress * 100}%`,
              background: "linear-gradient(to bottom, #665ed7, #7b74e0, #3a118f)",
              boxShadow: "0 0 20px rgba(123,116,224,0.3)",
            }}
          />
        </div>

        <div className="space-y-10 md:space-y-16 relative">
          {milestones.map((m, i) => (
            <div key={i} className="relative">
              {/* Node (desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-20 items-center justify-center">
                <RoadmapNode index={i} total={milestones.length} progress={progress} />
              </div>
              {/* Node (mobile) */}
              <div className="md:hidden flex items-center gap-3 mb-4">
                <RoadmapNode index={i} total={milestones.length} progress={progress} />
                <div className="h-[1px] flex-1 bg-white/[0.06]" />
                <span className="text-[11px] text-white/30 font-mono">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <MilestoneCard milestone={m} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <WaitlistCTA id="mission-cta" />
      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
