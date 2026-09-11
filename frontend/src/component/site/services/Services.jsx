"use client";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";
import useServicesContent from "@/hooks/site/useServicesContent";
import {
  Wallet,
  Receipt,
  PieChart,
  TrendingUp,
  CalendarRange,
  Bell,
} from "lucide-react";

const ICONS = { Wallet, Receipt, PieChart, TrendingUp, CalendarRange, Bell };

export default function Services() {
  const { header, services } = useServicesContent();

  return (
    <>
      <Navbar />
      <main className="bg-page">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-14 text-center">
          <h1 className="opacity-0 animate-fadeInUp text-3xl sm:text-4xl font-semibold text-text-primary">
            {header.title}
          </h1>
          <p
            className="opacity-0 animate-fadeInUp text-base text-text-secondary mt-4"
            style={{ animationDelay: "0.1s" }}
          >
            {header.subtitle}
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <div
                  key={i}
                  className="opacity-0 animate-fadeInUp group bg-card border border-border rounded-2xl p-5 hover:border-accent-primary/40 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent-primary group-hover:scale-110 transition-all duration-300">
                    <Icon
                      size={18}
                      className="text-accent-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
