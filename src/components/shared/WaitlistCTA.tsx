"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FadeSection } from "@/components/shared/FadeSection";
import { glass } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSubscribeMutation } from "@/hooks/useSubscribeMutation";

interface WaitlistCTAProps {
  id?: string;
}

export function WaitlistCTA({ id = "cta" }: WaitlistCTAProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { subscribe, loading } = useSubscribeMutation();

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed) { setError("Enter your email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { setError("Enter a valid email"); return; }
    setError("");
    const ok = await subscribe(trimmed);
    if (ok) { setSubmitted(true); setEmail(""); }
  };

  return (
    <FadeSection className="py-20 px-6" id={id}>
      <div className="max-w-5xl mx-auto text-center">
        <div className={cn("relative rounded-3xl p-10 sm:p-14 overflow-hidden", glass)}>
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none rounded-t-3xl" />

          <h2 className="relative text-3xl sm:text-4xl md:text-[3.25rem] font-semibold tracking-[-0.06em] leading-[0.95]">
            <span className="text-white/[0.92]">Be</span>{" "}
            <span className="italic font-serif text-sweep">
              first.
            </span>
          </h2>
          <p className="relative mt-3 text-white/40 max-w-lg mx-auto font-light leading-snug">
            Join the waitlist and get early access before we open to the public. No spam — just updates that matter.
          </p>

          {submitted ? (
            <div className="relative mt-6 flex flex-col items-center gap-3 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-white/70 font-medium">You&apos;re on the list!</p>
              <p className="text-xs text-white/40">We&apos;ll reach out when early access opens.</p>
            </div>
          ) : (
            <div className="relative mt-6 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="your@email.com"
                  className={cn(
                    "flex-1 w-full px-5 py-3 rounded-full text-sm text-white placeholder:text-white/25 focus:outline-none transition-all duration-300",
                    "bg-white/[0.04] border focus:border-primary/40",
                    error ? "border-red-500/60" : "border-white/[0.08]"
                  )}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gradient-to-r from-[#3a118f] to-[#665ed7] hover:from-[#4a1aaf] hover:to-[#7b74e0] text-white rounded-full px-6 gap-2 whitespace-nowrap h-11 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Joining…" : "Join the Waitlist"}
                </Button>
              </div>
              {error && (
                <p className="mt-2 text-xs text-red-400/90 text-center sm:text-left sm:pl-5">{error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </FadeSection>
  );
}
