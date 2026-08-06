"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "Information We Collect",
    body: "When you join our waitlist, we collect your email address. That's it. We don't collect names, phone numbers, payment information, or any other personal data at this stage.",
  },
  {
    title: "How We Use Your Information",
    body: "We use your email address solely to:\n\n• Send updates about Fastik's development progress\n• Notify you when early access opens\n• Share exclusive early access pricing with waitlist members\n\nWe will never use your email for unrelated marketing or sell it to third parties.",
  },
  {
    title: "Analytics",
    body: "Fastik uses Umami Analytics, a privacy-first analytics tool. Umami does not use cookies, does not collect personal data, and does not track you across websites. It only collects aggregate, anonymised statistics about page visits.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell, trade, rent, or otherwise share your personal information with third parties. Your email address is stored securely and used only as described in this policy.",
  },
  {
    title: "Data Retention",
    body: "We will retain your email address until you request deletion or until Fastik launches and you either become an active user or choose to unsubscribe. You may request deletion of your data at any time.",
  },
  {
    title: "Your Rights",
    body: "You have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Withdraw consent at any time\n\nTo exercise any of these rights, contact us at hello@fastik.io.",
  },
  {
    title: "Security",
    body: "We take reasonable technical and organisational measures to protect your information from unauthorised access, loss, or misuse. Your data is stored using industry-standard security practices.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. When we do, we will update the \"Last updated\" date at the top of this page. We encourage you to review this policy periodically.",
  },
  {
    title: "Contact Us",
    body: "If you have any questions about this Privacy Policy or how we handle your data, please contact us at hello@fastik.io.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl tracking-[-0.05em] leading-[0.95] mb-3">
            <span className="text-premium">Privacy</span>{" "}
            <span className="italic font-serif text-sweep">Policy</span>
          </h1>
          <p className="text-sm text-white/35 mt-2">Last updated: May 2026</p>
          <p className="mt-5 text-base text-white/50 leading-relaxed">
            Fastik is committed to protecting your privacy. This policy explains what information we collect, how we use it, and what rights you have over your data.
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i} className="border-t border-white/[0.06] pt-8">
              <h2 className="text-lg font-medium text-white/90 mb-3">
                {i + 1}. {section.title}
              </h2>
              <div className="space-y-2">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-sm text-white/50 leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
