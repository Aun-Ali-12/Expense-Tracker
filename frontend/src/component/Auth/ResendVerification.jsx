"use client";
import useResendVerification from "@/hooks/Auth/useResendVerification";
import { MailCheck } from "lucide-react";

export default function ResendVerification() {
  const { email, setEmail, loading, message, error, resendVerification } =
    useResendVerification();

  const handleSubmit = (e) => {
    e.preventDefault();
    resendVerification();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-sm border border-border p-8 animate-scale-in">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-balance-bg flex items-center justify-center">
            <MailCheck size={22} className="text-balance-label" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-text-primary text-center">
          Resend verification email
        </h1>
        <p className="text-sm text-text-secondary text-center mt-2 mb-6">
          Enter your email and we&apos;ll send you a new verification link.
        </p>

        {!message ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm
                           text-text-primary placeholder-text-muted
                           focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary
                           transition"
              />
            </div>

            {error && (
              <p className="text-sm text-expense-label -mt-1 animate-fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-primary hover:opacity-90 disabled:opacity-50
                         disabled:cursor-not-allowed text-white font-medium
                         py-2.5 rounded-lg transition-all"
            >
              {loading ? "Sending..." : "Resend verification email"}
            </button>
          </form>
        ) : (
          <div className="text-center animate-fade-in">
            <p className="text-sm text-income-label mb-6">{message}</p>
            <a
              href="/login"
              className="block w-full bg-accent-primary hover:opacity-90 text-white
                         text-center font-medium py-2.5 rounded-lg transition-all"
            >
              Back to login
            </a>
          </div>
        )}

        {!message && (
          <p className="text-center text-sm text-text-secondary mt-6">
            Remembered your details?{" "}
            <a
              href="/login"
              className="text-accent-primary hover:opacity-80 font-medium"
            >
              Back to login
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
