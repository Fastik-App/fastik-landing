"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    title: "Agreement to Terms",
    body: "By joining the Fastik waitlist or accessing our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our service.",
  },
  {
    title: "The Service",
    body: "Fastik is currently in pre-launch. The service described on this website represents our intended product. By joining the waitlist, you are expressing interest in early access — not purchasing or subscribing to any service.",
  },
  {
    title: "Waitlist Registration",
    body: "To join our waitlist, you provide your email address. You represent that:\n\n• The email address you provide is accurate and belongs to you\n• You are at least 16 years of age\n• You have the right to enter into these terms\n\nYou may unsubscribe from the waitlist at any time by contacting hello@fastik.io.",
  },
  {
    title: "No Guarantee of Access",
    body: "Joining the waitlist does not guarantee access to Fastik when it launches, nor does it guarantee any specific pricing, features, or timeline. We reserve the right to modify, delay, or cancel the product at any time.",
  },
  {
    title: "Acceptable Use",
    body: "When using our website, you agree not to:\n\n• Use the site for any unlawful purpose\n• Attempt to gain unauthorised access to our systems\n• Scrape, crawl, or systematically extract data from the site\n• Interfere with the proper operation of the website",
  },
  {
    title: "Intellectual Property",
    body: "All content on this website — including text, graphics, logos, and code — is the property of FASTIK and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, FASTIK shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) this website or the waitlist service.\n\nOur total liability to you for any claim shall not exceed the amount you have paid us, which in the case of the free waitlist is zero.",
  },
  {
    title: "Disclaimer of Warranties",
    body: "This website and its content are provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, error-free, or free of harmful components.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to update these Terms of Service at any time. When we do, we will update the \"Last updated\" date at the top of this page. Continued use of the website after any changes constitutes acceptance of the new terms.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved in the appropriate courts of jurisdiction.",
  },
  {
    title: "Contact Us",
    body: "If you have any questions about these Terms of Service, please contact us at hello@fastik.io.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden font-sans selection:bg-primary/30">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl tracking-[-0.05em] leading-[0.95] mb-3">
            <span className="text-premium">Terms of</span>{" "}
            <span className="italic font-serif text-sweep">Service</span>
          </h1>
          <p className="text-sm text-white/35 mt-2">Last updated: May 2026</p>
          <p className="mt-5 text-base text-white/50 leading-relaxed">
            Please read these Terms of Service carefully before using our website or joining the Fastik waitlist.
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
