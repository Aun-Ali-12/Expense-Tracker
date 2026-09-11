"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChartColumnBig, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          href="/"
          className="flex items-center gap-2 text-text-primary font-semibold text-base no-underline transition-transform hover:scale-105"
        >
          <ChartColumnBig size={22} className="text-accent-primary" />
          ExTrack
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-sm no-underline transition-colors duration-200
                  after:content-[''] after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5
                  after:h-[2px] after:bg-accent-primary after:origin-left after:transition-transform after:duration-300
                  ${
                    isActive
                      ? "text-accent-primary font-medium after:scale-x-100"
                      : "text-text-secondary hover:text-text-primary after:scale-x-0 hover:after:scale-x-100 focus-visible:text-accent-primary focus-visible:after:scale-x-100"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/signup"
          className="hidden md:inline-block bg-accent-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 hover:scale-105 transition-all shadow-sm shadow-accent-primary/20 no-underline"
        >
          Get started
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-text-primary"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border px-4 py-3 flex flex-col gap-1 bg-card animate-fadeInUp">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`relative px-3.5 py-2.5 text-sm no-underline w-fit transition-colors
                  after:content-[''] after:absolute after:left-3.5 after:right-3.5 after:-bottom-0
                  after:h-[2px] after:bg-accent-primary after:origin-left after:transition-transform after:duration-300
                  ${
                    isActive
                      ? "text-accent-primary font-medium after:scale-x-100"
                      : "text-text-secondary hover:text-text-primary after:scale-x-0 hover:after:scale-x-100"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="mt-2 bg-accent-primary text-white text-sm font-medium px-4 py-2.5 rounded-lg text-center no-underline hover:opacity-90 transition-opacity"
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}
