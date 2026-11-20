"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass, navFeatures } from "@/lib/constants";

interface NavbarProps {
  activePage?: "home" | "our-story" | "our-mission" | "pricing";
  ctaTarget?: string;
}

export function Navbar({ activePage, ctaTarget = "story" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const router = useRouter();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFeaturesNav = () => {
    setFeaturesOpen(false);
    if (window.location.pathname === "/") {
      scrollTo("features");
    } else {
      router.push("/#features");
    }
  };

  const handleMobileFeatures = () => {
    setMobileMenuOpen(false);
    if (window.location.pathname === "/") {
      scrollTo("features");
    } else {
      router.push("/#features");
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-4">
        <div className={cn("flex items-center justify-between h-14 px-6 rounded-2xl", glass)}>
          <Link href="/">
            <Image
              src="/assets/fastik-logo-white.png"
              alt="FASTIK"
              width={80}
              height={24}
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setFeaturesOpen(!featuresOpen)}
              aria-expanded={featuresOpen}
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-[13px] text-white/60 hover:text-white transition-colors duration-300"
            >
              Features
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", featuresOpen && "rotate-180")} />
            </button>
            <Link
              href="/our-story"
              className={cn(
                "text-[13px] transition-colors duration-300",
                activePage === "our-story" ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              Our Story
            </Link>
            <Link
              href="/our-mission"
              className={cn(
                "text-[13px] transition-colors duration-300",
                activePage === "our-mission" ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              Our Mission
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "text-[13px] transition-colors duration-300",
                activePage === "pricing" ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              Pricing
            </Link>
            <Button
              size="sm"
              onClick={() => scrollTo(ctaTarget)}
              className="bg-gradient-to-r from-[#3a118f] to-[#665ed7] hover:from-[#4a1aaf] hover:to-[#7b74e0] text-white rounded-full px-5 text-xs h-8 transition-all duration-300"
            >
              Join Early Access
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn("block w-5 h-[1.5px] bg-gradient-to-r from-white/80 to-primary/60 rounded-full transition-all duration-300 origin-center", mobileMenuOpen && "rotate-45 translate-y-[6.5px]")} />
            <span className={cn("block w-5 h-[1.5px] bg-white/60 rounded-full transition-all duration-300", mobileMenuOpen && "opacity-0 scale-x-0")} />
            <span className={cn("block w-5 h-[1.5px] bg-gradient-to-r from-primary/60 to-white/80 rounded-full transition-all duration-300 origin-center", mobileMenuOpen && "-rotate-45 -translate-y-[6.5px]")} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "md:hidden mx-6 mt-2 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          glass,
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none border-transparent"
        )}
      >
        <div className="p-5 space-y-1">
          <button
            onClick={handleMobileFeatures}
            className="flex items-center w-full px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-all duration-300"
          >
            Features
          </button>
          <Link
            href="/our-story"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center px-4 py-3 rounded-xl text-sm hover:bg-white/[0.05] transition-all duration-300",
              activePage === "our-story" ? "text-white" : "text-white/70 hover:text-white"
            )}
          >
            Our Story
          </Link>
          <Link
            href="/our-mission"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center px-4 py-3 rounded-xl text-sm hover:bg-white/[0.05] transition-all duration-300",
              activePage === "our-mission" ? "text-white" : "text-white/70 hover:text-white"
            )}
          >
            Our Mission
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center px-4 py-3 rounded-xl text-sm hover:bg-white/[0.05] transition-all duration-300",
              activePage === "pricing" ? "text-white" : "text-white/70 hover:text-white"
            )}
          >
            Pricing
          </Link>
          <div className="pt-4">
            <Button
              onClick={() => { setMobileMenuOpen(false); scrollTo(ctaTarget); }}
              className="w-full bg-gradient-to-r from-[#3a118f] to-[#665ed7] hover:from-[#4a1aaf] hover:to-[#7b74e0] text-white rounded-xl h-11 text-sm font-medium transition-all duration-300"
            >
              Join Early Access
            </Button>
          </div>
        </div>
      </div>

      {/* Features mega dropdown */}
      {featuresOpen && (
        <div className="hidden md:block mt-2 mx-auto max-w-4xl px-6">
          <div className={cn("rounded-2xl p-5 grid grid-cols-3 gap-3", glass)}>
            {navFeatures.map((f) => (
              <button
                key={f.title}
                onClick={handleFeaturesNav}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-300 text-left group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/90">{f.title}</p>
                  <p className="text-xs text-white/40 mt-0.5 line-clamp-2 leading-relaxed">{f.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
