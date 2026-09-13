"use client";
import Link from "next/link";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  ChartColumnBig,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from "@/Context/User";

export default function SideBar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { handleLogout } = useUser();
  //navbar elements
  const navItems = [
    { label: "Dashboard", link: "/expense", icon: LayoutDashboard },
    { label: "Budget", link: "/budget", icon: Wallet },
    { label: "Analytics", link: "/analytics", icon: BarChart3 },
  ];

  return (
    <>
      <aside
        className={`h-screen bg-sidebar flex flex-col transition-all duration-300 ${
          collapsed ? "w-20" : "w-56"
        }`}
      >
        {/* Top: Logo + Toggle button */}

        <div className="flex items-center justify-between px-5 py-5">
          {!collapsed && (
            <div className="flex items-center gap-2 text-white font-medium text-base">
              <ChartColumnBig size={20} aria-hidden="true" />
              <span>ExTrack</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex items-center justify-center w-7 h-7 rounded-md text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors mx-auto cursor-pointer"
          >
            {collapsed ? (
              <ChevronRight size={16} aria-hidden="true" />
            ) : (
              <ChevronLeft size={16} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* navbar wrapper */}
        <nav aria-label="Main navigation" className="flex-1 px-3">
          <ul className="flex flex-col gap-1 list-none p-0 m-0">
            {navItems.map((item) => {
              const isActive = pathname === item.link;
              const Icon = item.icon;

              return (
                <li key={item.link}>
                  <Link
                    href={item.link}
                    aria-current={isActive ? "page" : undefined}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm no-underline transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-sidebar-active text-sidebar-text-active"
                        : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                    }`}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
