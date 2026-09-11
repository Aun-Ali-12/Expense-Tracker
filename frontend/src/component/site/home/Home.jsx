"use client";
import useHomeContent from "@/hooks/site/useHomeContent";
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";
import StatCard from "./StatsCard";

const ICONS = { LayoutDashboard, BarChart3, Wallet, Sparkles };

export default function Home() {
  const { hero, stats, features } = useHomeContent();

  return (
    <>
      <Navbar />
      <main className="bg-page overflow-hidden">
        {/* Hero */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-24">
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-3xl" />

          <div className="relative text-center">
            <span
              className="opacity-0 animate-fadeInUp inline-flex items-center gap-2 bg-accent-primary/10 text-accent-primary text-xs font-medium px-3 py-1.5 rounded-full mb-5"
              style={{ animationDelay: "0s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-primary" />
              </span>
              {hero.badge}
            </span>

            <h1
              className="opacity-0 animate-fadeInUp text-4xl sm:text-6xl font-bold text-text-primary max-w-3xl mx-auto leading-tight tracking-tight"
              style={{ animationDelay: "0.1s" }}
            >
              {hero.title}
            </h1>

            <p
              className="opacity-0 animate-fadeInUp text-base sm:text-lg text-text-secondary max-w-xl mx-auto mt-5"
              style={{ animationDelay: "0.2s" }}
            >
              {hero.subtitle}
            </p>

            <div
              className="opacity-0 animate-fadeInUp flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
              style={{ animationDelay: "0.3s" }}
            >
              <a
                href={hero.ctaPrimary.link}
                className="flex items-center gap-1.5 bg-accent-primary text-white text-sm font-medium px-6 py-3 rounded-xl hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-accent-primary/25 no-underline"
              >
                {hero.ctaPrimary.label} <ArrowRight size={16} />
              </a>
              <a
                href={hero.ctaSecondary.link}
                className="text-sm font-medium text-text-primary border
              border-border px-6 py-3 rounded-xl hover:bg-slate-50
              hover:border-accent-primary/30 transition-colors no-underline"
              >
                {hero.ctaSecondary.label}
              </a>
            </div>
          </div>

          {/* App showcase — video/image */}
          <div
            className="opacity-0 animate-fadeInUp relative mt-16 max-w-4xl mx-auto"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-primary/20 to-purple-400/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden aspect-video">
              {/* Apni app ki demo video ka path yahan dein */}
              <video
                className="w-full h-full object-cover"
                src="/videos/app-demo.mp4"
                poster="/images/app-preview.png"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <StatCard stat={stat} />
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-28">
          <h2 className="opacity-0 animate-fadeInUp text-3xl font-bold text-text-primary text-center mb-3 tracking-tight">
            Everything you need, nothing you don't
          </h2>
          <p
            className="opacity-0 animate-fadeInUp text-text-secondary text-center max-w-lg mx-auto mb-12"
            style={{ animationDelay: "0.1s" }}
          >
            Built to keep money tracking simple, fast, and actually useful.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => {
              const Icon = ICONS[f.icon];
              return (
                <div
                  key={i}
                  className="opacity-0 animate-fadeInUp group bg-card border border-border rounded-2xl p-6 h-full hover:border-accent-primary/40 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4 group-hover:bg-accent-primary group-hover:scale-110 transition-all duration-300">
                    <Icon
                      size={20}
                      className="text-accent-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {f.description}
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
