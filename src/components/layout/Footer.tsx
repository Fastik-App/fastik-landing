import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const productLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
];

const companyLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Our Mission", href: "/our-mission" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { label: "Twitter / X", href: "https://x.com/fastik-io", Icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/fastik-io", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/fastik.io", Icon: Instagram },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/assets/fastik-logo-white.png"
              alt="FASTIK"
              width={72}
              height={22}
              className="h-5 w-auto opacity-80 mb-4"
            />
            <p className="text-xs text-white/35 leading-relaxed max-w-[180px]">
              The all-in-one workspace built for creative teams.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-4">Product</p>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 font-light">
            © {new Date().getFullYear()} FASTIK. All rights reserved.
          </p>
          <p className="text-xs text-white/20 font-light italic">
            Built by creatives, for creatives.
          </p>
        </div>
      </div>
    </footer>
  );
}
