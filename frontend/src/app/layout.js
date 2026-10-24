import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ExpenseProvider } from "@/Context/ExpenseData";
import { UserProvider } from "@/Context/User";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from '@next/third-parties/google'


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://extrack-delta.vercel.app"),
  title: {
    default: "ExTrack - AI-Powered Expense Tracker & Budget Planner",
    template: "%s | ExTrack",
  },
  description:
    "ExTrack is an expense tracker app that uses AI features to make tracking your daily transactions and budgets easier.",
  openGraph: {
    title: "ExTrack - AI-Powered Expense Tracker & Budget Planner",
    description:
      "Track your daily transactions and budgets with an AI-powered expense tracker.",
    siteName: "ExTrack",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ExTrack expense tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ExTrack - AI-Powered Expense Tracker & Budget Planner",
    description:
      "Track your daily transactions and budgets with an AI-powered expense tracker.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        {/* top bar loader whenever user relocates  */}
        <NextTopLoader color="#0ea5e9" showSpinner={false} />
        {children}
        {/* toaster alert  */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
