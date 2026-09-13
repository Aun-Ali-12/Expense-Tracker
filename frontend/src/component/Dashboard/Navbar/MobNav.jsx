"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  ChartColumnBig,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", link: "/expense", icon: LayoutDashboard },
    { label: "Budget", link: "/budget", icon: Wallet },
    { label: "Analytics", link: "/analytics", icon: BarChart3 },
  ];

  return (
    <div className="md:hidden">
      {/* Floating bar */}
      <div className="fixed top-4 left-4 right-4 z-50 bg-sidebar-light-1 backdrop-blur-md border border-white/15 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-medium text-base">
          <ChartColumnBig size={20} aria-hidden="true" />
          <span>ExTrack</span>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-white hover:bg-sidebar-hover transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Dropdown menu panel */}
      {isOpen && (
        <div className="fixed top-[76px] left-4 right-4 z-40 bg-sidebar rounded-2xl shadow-lg p-3 animate-scale-in">
          <ul className="flex flex-col gap-1 list-none p-0 m-0">
            {navItems.map((item) => {
              const isActive = pathname === item.link;
              const Icon = item.icon;

              return (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm no-underline transition-colors ${
                      isActive
                        ? "bg-sidebar-active text-sidebar-text-active"
                        : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                    }`}
                  >
                    <Icon size={17} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Overlay — panel ke bahar click karne pe band ho jaye */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer — taake floating navbar page content ko overlap na kare */}
      <div className="h-20" />
    </div>
  );
}
