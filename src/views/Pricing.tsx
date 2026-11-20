"use client";

import { Check, Users, User, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { glass, glassHover } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaitlistCTA } from "@/components/shared/WaitlistCTA";
import { FadeSection } from "@/components/shared/FadeSection";

const plans = [
  {
    name: "Solo",
    icon: User,
    desc: "For independent editors and freelance creators managing client work on their own.",
    features: [
      "Unlimited projects",
      "Time-stamped video feedback",
      "Client dashboard & portal",
      "File sharing & organisation",
      "Integrated calendar",
      "14-day free trial",
    ],
    popular: false,
  },
  {
    name: "Team",
    icon: Users,
    desc: "For growing studios coordinating multiple editors, clients, and deliverables.",
    features: [
      "Everything in Solo",
      "Team messaging",
      "Kanban project boards",
      "Up to 10 team members",
      "Internal review stages",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Agency",
    icon: Building2,
    desc: "For full-service agencies managing multiple clients, large teams, and complex workflows.",
    features: [
      "Everything in Team",
      "Editor performance analytics",
      "Custom workflows & automations",
      "Unlimited team members",
      "White-label client portals",
      "Dedicated onboarding",
    ],
    popular: false,
  },
];

const pricingFaqs = [
  { q: "How much will Fastik cost?", a: "Pricing will be announced at launch. Waitlist members will receive exclusive early access rates — significantly lower than public pricing." },
  { q: "Will there be a free plan?", a: "Every paid plan includes a 14-day free trial with no credit card required. We're also exploring a free tier for solo creators." },
  { q: "Can I switch plans later?", a: "Yes. You'll be able to upgrade or downgrade your plan at any time. Billing adjusts automatically." },
  { q: "What does 'early access pricing' mean?", a: "Waitlist members who join before launch will be offered a discounted rate — locked in for the lifetime of their subscription." },
  { q: "Are client seats included?", a: "Yes. Client access to their project portal is free and unlimited on all plans. You only pay for your team's seats." },
  { q: "What payment methods will you accept?", a: "We'll accept all major credit and debit cards. Annual billing will be available with a 20% discount." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-white/[0.06] last:border-0 py-5">
      <p className="text-sm sm:text-base text-white/80 mb-2">{q}</p>
      <p className="text-sm text-white/45 leading-relaxed">{a}</p>
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      <Navbar activePage="pricing" ctaTarget="pricing-cta" />

      <main>
        {/* ── HERO ── */}
        <FadeSection className="relative pt-32 pb-16 px-6 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none" />
          <div className="relative">
            <div className={cn('inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs text-primary/80 mb-6', glass)}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Pricing — Coming at Launch
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[4rem] leading-[0.95] tracking-[-0.06em] max-w-3xl mx-auto">
              <span className="text-premium">Plans for every</span>
              <br />
              <span className="italic font-serif text-sweep">creative professional</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Join the waitlist now to lock in exclusive early access pricing — significantly lower than public rates.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-white/35">
              <span>✓ 14-day free trial on every plan</span>
              <span>✓ No credit card required</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </FadeSection>

        {/* ── PLANS ── */}
        <FadeSection className="relative px-6 pb-20">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4 sm:gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative p-7 rounded-2xl flex flex-col gap-6 transition-all duration-500',
                  glass,
                  plan.popular ? 'border-primary/30 bg-primary/[0.05]' : glassHover
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3a118f] to-[#665ed7] text-[11px] text-white font-medium whitespace-nowrap shadow-lg">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', plan.popular ? 'bg-primary/15 border border-primary/25' : 'bg-white/[0.05] border border-white/[0.08]')}>
                    <plan.icon className={cn('w-5 h-5', plan.popular ? 'text-primary' : 'text-white/45')} />
                  </div>
                  <h2 className="text-xl font-semibold text-white/95 mb-2">{plan.name}</h2>
                  <p className="text-sm text-white/40 leading-relaxed">{plan.desc}</p>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/65">
                      <Check className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/[0.06]">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-white/30 mb-1">—</p>
                    <p className="text-xs text-white/30 italic">Price revealed at launch</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-white/30">
            Annual billing available — save 20%. All plans include unlimited client seats.
          </p>
        </FadeSection>

        {/* ── PRICING FAQ ── */}
        <FadeSection className="relative py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center text-3xl sm:text-4xl leading-[0.95] tracking-[-0.06em] mb-10">
              <span className="text-premium">Pricing</span>{' '}
              <span className="italic font-serif text-sweep">FAQ</span>
            </h2>
            <div className={cn('rounded-2xl px-6', glass)}>
              {pricingFaqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </FadeSection>

        {/* ── CTA ── */}
        <WaitlistCTA id="pricing-cta" />
      </main>

      <Footer />
    </div>
  );
}
