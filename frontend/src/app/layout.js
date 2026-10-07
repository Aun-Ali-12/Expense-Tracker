import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { ExpenseProvider } from "@/Context/ExpenseData";
import { UserProvider } from "@/Context/User";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";


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
  title: "ExTrack",
  description: "ExTrack is an expense tracker app. It uses AI features to make it easier to track your daily transactions.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* user context provider  */}
        <UserProvider>
          {/* expense context provider  */}
          <ExpenseProvider>
            {/* top bar loader whenever user relocates  */}
            <NextTopLoader color="#0ea5e9" showSpinner={false} />
            {children}
            {/* toaster alert  */}
            <Toaster position="top-right" reverseOrder={false} />
          </ExpenseProvider>
        </UserProvider>
      </body>
    </html>
  );
}
