"use client";
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";
import useContactContent from "@/hooks/site/useContactContent";
import { Mail, MapPin, Clock } from "lucide-react";

const ICONS = { Mail, MapPin, Clock };

export default function Contact() {
  const { header, contactInfo, formFields } = useContactContent();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // tumhara submit logic yahan
  };

  return (
    <>
      <Navbar />
      <main className="bg-page">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
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

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Contact info */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              {contactInfo.map((info, i) => {
                const Icon = ICONS[info.icon];
                return (
                  <div
                    key={i}
                    className="opacity-0 animate-fadeInUp bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-accent-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                    style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-accent-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">
                        {info.label}
                      </p>
                      <p className="text-sm font-medium text-text-primary">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Form */}
            <div
              className="opacity-0 animate-fadeInUp lg:col-span-2 bg-card border border-border rounded-2xl p-5 sm:p-7"
              style={{ animationDelay: "0.3s" }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {formFields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.name}
                      className="text-xs font-medium text-text-secondary uppercase tracking-wide"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        className="px-3.5 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all resize-none"
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        className="px-3.5 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="mt-2 bg-accent-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
