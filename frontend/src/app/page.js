import Home from "@/component/site/home/Home";

export const metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ExTrack",
  url: "https://extrack-delta.vercel.app",
  description:
    "ExTrack is an free expense tracker application that uses AI features to make tracking daily transactions and budgets easier.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  creator: {
    "@type": "Person",
    name: "Aun Ali",
    url: "https://aun-ali.vercel.app",
  },
};

export default function HomePage() {
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
    <Home />
  </>);
}
