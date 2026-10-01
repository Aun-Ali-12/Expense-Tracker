"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { ChartColumnBig } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy & Policy" },
];

const socials = [
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
];

function FooterGlowCurve() {
  const pathRef = useRef(null);
  const wrapperRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // sirf ek baar chale, scroll up/down pe repeat na ho
        }
      },
      { threshold: 0.25 },
    );

    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible && pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
      // force reflow taake transition trigger ho
      pathRef.current.getBoundingClientRect();
      pathRef.current.style.transition =
        "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1)";
      pathRef.current.style.strokeDashoffset = "0";
    }
  }, [visible]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <filter id="footerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Glow layer — thick, blurred, halka opacity */}
        <path
          d="M 0 280 C 250 280, 350 60, 600 150 C 850 240, 950 20, 1200 20"
          fill="none"
          stroke="var(--color-accent-primary)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.35"
          filter="url(#footerGlow)"
          style={{
            strokeDasharray: 1800,
            strokeDashoffset: visible ? 0 : 1800,
            transition: visible
              ? "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
          }}
        />

        {/* Sharp core line */}
        <path
          ref={pathRef}
          d="M 0 280 C 250 280, 350 60, 600 150 C 850 240, 950 20, 1200 20"
          fill="none"
          stroke="var(--color-accent-primary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-border mt-20 overflow-hidden">
      <FooterGlowCurve />

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
