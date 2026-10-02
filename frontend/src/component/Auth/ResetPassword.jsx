"use client";
import useResetPassword from "@/hooks/Auth/useForgotPassword";
import { XCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Suspense } from "react";

function ResetPasswordComp() {
  const {
    password,
    setPassword,
    reEnter,
    setReEnter,
    loading,
    error,
    passwordChecks,
    show,
    setShow,
    showReEnter,
    setShowReEnter,
    message,
    handleSubmit,
  } = useResetPassword();
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-page px-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-sm border border-border p-8 animate-scale-in">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-balance-bg flex items-center justify-center">
              <CheckCircle2 size={22} className="text-balance-label" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-text-primary text-center">
            Set a new password
          </h1>
          <p className="text-sm text-text-secondary text-center mt-2 mb-6">
            Your new password must be different from previous passwords.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password ? password : ""}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 pr-11 text-sm
                           text-text-primary placeholder-text-muted
                           focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary
                           transition"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password rules */}
            <ul className="flex flex-col gap-1.5 -mt-1">
              {[
                { key: "hasMinLength", label: "At least 8 characters" },
                { key: "hasUpperCase", label: "One uppercase letter" },
                { key: "hasLowerCase", label: "One lowercase letter" },
                { key: "hasSpecialChar", label: "One special character" },
              ].map((rule) => (
                <li
                  key={rule.key}
                  className={`flex items-center gap-1.5 text-xs transition-colors ${
                    passwordChecks[rule.key]
                      ? "text-income-label"
                      : "text-text-muted"
                  }`}
                >
                  {passwordChecks[rule.key] ? (
                    <CheckCircle2
                      size={13}
                      className="text-income-label shrink-0"
                    />
                  ) : (
                    <XCircle
                      size={13}
                      className="text-expense-label shrink-0"
                    />
                  )}
                  {rule.label}
                </li>
              ))}
            </ul>

            {/* Re-enter password */}
            <div>
              <label
                htmlFor="reEnter"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Re-enter your new password
              </label>
              <div className="relative">
                <input
                  id="reEnter"
                  type={showReEnter ? "text" : "password"}
                  value={reEnter ? reEnter : ""}
                  onChange={(e) => setReEnter(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-lg border border-border bg-card px-4 py-2.5 pr-11 text-sm
                           text-text-primary placeholder-text-muted
                           focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent-primary
                           transition"
                />
                <button
                  type="button"
                  onClick={() => setShowReEnter(!showReEnter)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showReEnter ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {password && reEnter && password !== reEnter && (
              <p className="text-xs text-expense-label -mt-1">
                Passwords do not match
              </p>
            )}

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
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>

          {message && (
            <p className="text-center text-sm text-income-label mt-4 animate-fade-in">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default function ResetPassword() {
  return (
    <>
      <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
        <ResetPasswordComp />
      </Suspense>
    </>
  );
}
