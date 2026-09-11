"use client";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";
import useAboutContent from "@/hooks/site/useAboutContent";
import { Zap, Eye, ShieldCheck } from "lucide-react";

const ICONS = { Zap, Eye, ShieldCheck };

export default function About() {
  const { intro, story, values, team } = useAboutContent();

  return (
    <>
      <Navbar />
      <main className="bg-page">
        {/* Intro */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-14 text-center">
          <h1 className="opacity-0 animate-fadeInUp text-3xl sm:text-4xl font-semibold text-text-primary leading-tight">
            {intro.title}
          </h1>
          <p
            className="opacity-0 animate-fadeInUp text-base text-text-secondary mt-4"
            style={{ animationDelay: "0.1s" }}
          >
            {intro.description}
          </p>
        </section>

        {/* Story */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div
            className="opacity-0 animate-fadeInUp bg-card border border-border rounded-2xl p-6 sm:p-8"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              {story.title}
            </h2>
            <div className="flex flex-col gap-3">
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-sm text-text-secondary leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {values.map((v, i) => {
              const Icon = ICONS[v.icon];
              return (
                <div
                  key={i}
                  className="opacity-0 animate-fadeInUp bg-card border border-border rounded-2xl p-5 hover:border-accent-secondary/40 hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-secondary/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-accent-secondary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
          <h2 className="opacity-0 animate-fadeInUp text-lg font-semibold text-text-primary mb-4 text-center">
            Who's behind this
          </h2>
          <div className="flex justify-center">
            {team.map((member, i) => (
              <div
                key={i}
                className="opacity-0 animate-fadeInUp bg-card border border-border rounded-2xl p-5 flex items-center gap-3 hover:border-accent-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                <div className="w-11 h-11 rounded-full bg-accent-primary text-white flex items-center justify-center text-sm font-medium">
                  {member.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {member.name}
                  </p>
                  <p className="text-xs text-text-secondary">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
