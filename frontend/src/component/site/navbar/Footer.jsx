import Link from "next/link";
import { ChartColumnBig } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border mt-20 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-accent-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-primary font-semibold text-base">
              <ChartColumnBig size={20} className="text-accent-primary" />
              ExTrack
            </div>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[220px]">
              Track spending, set budgets, and understand where your money goes.
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
              Navigate
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-text-secondary hover:text-accent-primary no-underline transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wide">
              Follow us
            </h4>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-secondary hover:text-accent-primary hover:border-accent-primary/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} ExTrack. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-text-secondary">
            <Link
              href="/privacy"
              className="hover:text-accent-primary no-underline transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-accent-primary no-underline transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
