import usePrivacyPolicy from "@/hooks/site/usePrivacyPolicy";
import Navbar from "../navbar/Navbar";
import Footer from "../navbar/Footer";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function PrivacyPolicy() {
  const { policy, error } = usePrivacyPolicy();

  if (error) {
    return (
      <div className="max-w-3xl mx-auto w-full px-4 py-6 sm:py-10">
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl px-4 py-8 sm:px-5 sm:py-10 text-center">
          <p className="text-sm text-text-primary font-medium break-words">
            Could not load the privacy policy.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto w-full px-4 py-6 sm:py-10">
        <section className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden w-full">
          {/* Header */}
          <header className="px-4 py-3 sm:px-5 sm:py-4 border-b border-border flex flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-semibold text-text-primary">
                {policy.title}
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                {policy.subtitle}
              </p>
            </div>
            <span className="shrink-0 text-xs font-medium text-balance-label bg-balance-bg px-2.5 py-1 rounded-full whitespace-nowrap">
              Updated {fmtDate(policy.lastUpdated)}
            </span>
          </header>

          {/* Intro */}
          <div className="px-4 py-4 sm:px-5 sm:py-5 border-b border-border bg-balance-bg/40">
            <p className="text-sm text-text-secondary leading-relaxed">
              {policy.intro}
            </p>
          </div>

          {/* Table of contents */}
          <nav
            aria-label="Policy sections"
            className="px-4 py-3 sm:px-5 sm:py-4 border-b border-border"
          >
            <p className="text-xs font-medium text-text-muted mb-2">
              On this page
            </p>
            <ul className="flex flex-wrap gap-2">
              {policy.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block text-xs font-medium text-accent-primary hover:underline bg-balance-bg px-2.5 py-1 rounded-full"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <ul className="divide-y divide-border">
            {policy.sections.map((s) => (
              <li
                key={s.id}
                id={s.id}
                className="px-4 py-4 sm:px-5 sm:py-5 scroll-mt-4 hover:bg-slate-50/50 transition-colors"
              >
                <h2 className="text-sm sm:text-base font-semibold text-text-primary">
                  {s.title}
                </h2>

                {s.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="mt-2 text-sm text-text-secondary leading-relaxed break-words"
                  >
                    {p}
                  </p>
                ))}

                {s.items?.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {s.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-text-secondary leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-primary"
                        />
                        <span className="min-w-0 break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Contact */}
          <footer className="px-4 py-4 sm:px-5 sm:py-5 border-t border-border bg-balance-bg/40">
            <p className="text-sm font-medium text-text-primary">
              Questions about this policy?
            </p>
            <p className="mt-1 text-xs sm:text-sm text-text-secondary break-words">
              Email us at{" "}
              <a
                href={`mailto:${policy.contactEmail}`}
                className="font-medium text-accent-primary hover:underline"
              >
                {policy.contactEmail}
              </a>
            </p>
          </footer>
        </section>
      </div>
      <Footer />
    </>
  );
}
