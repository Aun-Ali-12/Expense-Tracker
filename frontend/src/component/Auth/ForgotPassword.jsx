"use client";
import useforgotPassword from "@/hooks/Auth/useForgotLink";
import { Mail, KeyRound } from "lucide-react";

export default function ForgotPassword() {
  const { email, setEmail, message, loading, isError, sendPasswordLink } =
    useforgotPassword();
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-page px-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 animate-scale-in">
          {/* Heading */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mx-auto mb-3">
              <KeyRound size={20} className="text-accent-primary" />
            </div>
            <h1 className="text-xl font-semibold text-text-primary">
              Forgot password?
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-text-secondary uppercase tracking-wide"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-primary"
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border bg-page/50 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent focus:bg-card transition-all"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={sendPasswordLink}
              disabled={loading}
              className="mt-2 bg-accent-primary text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            {/* Message */}
            {message && (
              <p
                className={`text-xs rounded-lg px-3 py-2 text-center border ${
                  isError
                    ? "text-rose-600 bg-rose-50 border-rose-100"
                    : "text-emerald-600 bg-emerald-50 border-emerald-100"
                }`}
              >
                {message}
              </p>
            )}
          </div>
          {/* Back to login */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-sky-500 hover:text-sky-600 font-medium"
            >
              Back to login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
