"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FadeSection } from "@/components/shared/FadeSection";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DownloadSection } from "@/components/shared/DownloadSection";

const teamMembers = [
  { name: "Aminu Iradukunda Hassan", role: "Founder & CEO", photo: "/assets/team/Aminu_picture.webp" },
  { name: "Kevin Ngabo Kalisa", role: "Co-Founder & CTO", photo: "/assets/team/Kevin.webp" },
  { name: "Abdouldjariru Hassan Tuyizere", role: "Co-Founder & CMO", photo: "/assets/team/Djariru.webp" },
  { name: "Adalat Zulfugarov", role: "UI/UX Designer", photo: "/assets/team/Adalat.webp" },
  { name: "Zeeshan Nazir", role: "Software Engineer", photo: "/assets/team/Zeeshan.webp" },
  { name: "Bugashane Mardochee", role: "Graphic Designer", photo: "/assets/team/Bugas.webp" },
  { name: "Mohamed Mahmoud Mansour", role: "Software Engineer", photo: "/assets/team/Mohmad.webp" },
  { name: "Gihozo Yassin", role: "Software Engineer", photo: "/assets/team/Yassin.webp" },
];

const storyParagraphs = [
  { text: "My name is Aminu Hassan Iradukunda, founder of FASTIK." },
  { text: "For years, I worked across festivals, concerts, and creative productions — leading teams, managing clients, and delivering projects under real pressure." },
  { text: "The creative work itself was never the problem. The problem was everything around it." },
  { text: "Managing files, collecting feedback, keeping clients updated, and making sure everyone was looking at the right version of the work." },
  { text: "Like many creatives, I relied on different tools to handle all of this. But none of them really fit the way creative production actually works." },
  { text: "I would use maybe 30% of the features in one platform, then open another tool to fill the gaps. Files in one place. Feedback somewhere else. Communication scattered across apps." },
  { text: "Before long, I was juggling five or more tools just to keep a single project organized. And the more I worked this way, the more one question kept coming back:" },
  { text: "Why are creatives constantly adapting to these systems? Shouldn't the tools adapt to the way creative work actually happens?", italic: true },
  { text: "That question became the starting point for FASTIK. What if everything lived in one place — files, feedback, communication, and client access — designed specifically for the speed and flow of creative work?" },
  { text: "FASTIK wasn't born from a whiteboard exercise. It came from real productions, real deadlines, and the everyday experience of trying to make disconnected tools work together." },
  { text: "We know the chaos because we've lived it. And now we're building the workspace we always wished existed.", bold: true },
];

/* ─────────────────────────── page component ─────────────────────── */

export default function OurStory() {
  const [storyExpanded, setStoryExpanded] = useState(false);
  const heroRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans selection:bg-primary/30">

      {/* ── NAV ── */}
      <Navbar activePage="our-story" ctaTarget="story-cta" />

      <main>
      {/* ── HERO with blur reveal ── */}
      <div
        ref={heroRef}
        style={{
          opacity: 0,
          transform: "translateY(30px) scale(0.98)",
          filter: "blur(4px)",
          transition:
            "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease-out",
        }}
      >
        {/* Badge */}
        <div className="text-center pt-28 sm:pt-32">
          <span className={cn("inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs text-white/60 font-light tracking-wide", glass)}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#7b74e0] animate-pulse" />
            The Story Behind FASTIK
          </span>
        </div>

        {/* Heading */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
          <h1 className="text-center text-4xl sm:text-5xl md:text-[3.5rem]">
            <span className="text-premium">Meet the</span>{" "}
            <span className="italic font-serif text-sweep inline-block">
              Founder
            </span>
          </h1>

          {/* Cinematic hero card */}
          <div className={cn("relative mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden", glass)}>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none z-10 rounded-t-2xl sm:rounded-t-3xl" />

            <div className="flex flex-col lg:flex-row">
              {/* Photo */}
              <div className="relative lg:w-[30%] lg:flex-shrink-0 lg:self-stretch">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] md:aspect-auto md:h-[700px] lg:aspect-auto lg:h-full overflow-hidden">
                  <Image
                    src="/assets/founder-photo.webp"
                    alt="Aminu Hassan Iradukunda, Founder of FASTIK"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#09090b]/80" />
                  {/* Mobile/tablet name badge */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-8 lg:hidden">
                    <p className="text-base sm:text-lg md:text-xl font-semibold">Aminu Hassan Iradukunda</p>
                    <p className="text-xs md:text-sm text-white/50 mt-0.5">Founder & CEO</p>
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="relative flex-1 p-5 sm:p-7 md:p-8 lg:py-10 lg:px-14 flex flex-col justify-center">
                {/* lg+ name */}
                <div className="hidden lg:flex items-center gap-3 mb-5">
                  <div>
                    <p className="text-lg font-semibold">Aminu Hassan Iradukunda</p>
                    <p className="text-xs text-white/40 tracking-wide uppercase">Founder & CEO</p>
                  </div>
                </div>

                {/* Mobile only: collapsible */}
                <div className="md:hidden">
                  <div
                    className={cn(
                      "relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      !storyExpanded && "max-h-[160px]"
                    )}
                  >
                    <div className="space-y-3">
                      {storyParagraphs.map((p, i) => (
                        <p
                          key={i}
                          className={cn(
                            "leading-[1.7] text-[13px]",
                            p.italic ? "text-white/50 italic" : p.bold ? "text-white/50" : "text-white/45"
                          )}
                        >
                          {p.text}
                        </p>
                      ))}
                    </div>
                    {!storyExpanded && (
                      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#09090b]/90 to-transparent pointer-events-none" />
                    )}
                  </div>
                  <button
                    onClick={() => setStoryExpanded(!storyExpanded)}
                    className="mt-3 flex items-center gap-1.5 text-xs text-primary/80 hover:text-primary transition-colors duration-300"
                  >
                    {storyExpanded ? "Read less" : "Read more"}
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", storyExpanded && "rotate-180")} />
                  </button>
                </div>

                {/* md: single column, full story */}
                <div className="hidden md:block lg:hidden columns-1 space-y-3">
                  {storyParagraphs.map((p, i) => (
                    <p
                      key={i}
                      className={cn(
                        "leading-[1.7] text-[13.5px]",
                        p.italic ? "text-white/50 italic" : p.bold ? "text-white/50" : "text-white/45"
                      )}
                    >
                      {p.text}
                    </p>
                  ))}
                </div>

                {/* lg+: two-column layout */}
                <div className="hidden lg:block columns-2 gap-8 space-y-3">
                  {storyParagraphs.map((p, i) => (
                    <p
                      key={i}
                      className={cn(
                        "leading-[1.7] text-[13.5px]",
                        p.italic ? "text-white/50 italic" : p.bold ? "text-white/50" : "text-white/45"
                      )}
                    >
                      {p.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── OUR TEAM ── */}
      <FadeSection className="max-w-5xl mx-auto px-6 mt-32 mb-10">
        <h2 className="text-center text-3xl sm:text-4xl md:text-[3rem]">
          <span className="text-premium">Our</span>{" "}
          <span className="italic font-serif text-sweep inline-block">
            Team
          </span>
        </h2>
        <p className="text-center mt-4 text-white/40 font-light max-w-lg mx-auto">
          The passionate people building the future of creative collaboration.
        </p>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={cn(
                "group rounded-2xl overflow-hidden transition-all duration-300",
                glass,
                "hover:bg-white/[0.06] hover:border-white/[0.12]"
              )}
            >
              <div className="relative aspect-[3/4] sm:aspect-square overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm text-white/90 leading-tight">{member.name}</h3>
                <p className="text-xs text-white/40 mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeSection>

      {/* ── CTA ── */}
      <DownloadSection />
      </main>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
