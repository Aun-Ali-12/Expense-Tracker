"use client";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import useForm from "@/hooks/Auth/useForm";
import { useState } from "react";
import Link from "next/link";

export default function AuthForm({ mode }) {
  const {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    succes,
    passwordChecks,
  } = useForm(mode);

  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {/* bg color div  */}
      <div className="min-h-screen w-full flex items-center justify-center bg-page px-4">
        {/* form and heading container */}
        <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 animate-scale-in">
          {/* heading div (Shows text on mode basis)  */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-balance-bg flex items-center justify-center mx-auto mb-3">
              <Lock size={20} className="text-balance-label" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              {mode === "signup" ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              {mode === "signup"
                ? "Sign up to start tracking your expenses"
                : "Log in to continue to your dashboard"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-semibold text-text-secondary"
                >
                  Full name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-primary"
                  />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ahmad Ali"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border bg-page text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent focus:bg-card transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-text-secondary"
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-border bg-page text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent focus:bg-card transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-text-secondary"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-primary"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  minLength={mode === "login" ? 8 : undefined}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-border bg-page text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent focus:bg-card transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-accent-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Password strength checklist — sirf signup mode mein */}
            {mode === "signup" && (
              <ul className="flex flex-col gap-1.5 -mt-1">
                {[
                  { key: "hasMinLength", label: "At least 8 characters" },
                  { key: "hasUpperCase", label: "One uppercase letter" },
                  { key: "hasLowerCase", label: "One lowercase letter" },
                  { key: "hasSpecialChar", label: "One special character" },
                ].map((rule) => (
                  <li
                    key={rule.key}
                    className={`flex items-center gap-1.5 text-xs ${
                      passwordChecks[rule.key]
                        ? "text-income-label"
                        : "text-text-muted"
                    }`}
                  >
                    {passwordChecks[rule.key] ? (
                      <CheckCircle2 size={13} className="text-income-label" />
                    ) : (
                      <XCircle size={13} className="text-expense-label" />
                    )}
                    {rule.label}
                  </li>
                ))}
              </ul>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-accent-primary text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                  ? "Sign up"
                  : "Log in"}
            </button>

            {/* Error / Success messages */}
            {error && (
              <p className="text-xs text-expense-label bg-expense-bg border border-expense-bg rounded-lg px-3 py-2 text-center">
                {error}
              </p>
            )}
            {succes && (
              <p className="text-xs text-income-label bg-income-bg border border-income-bg rounded-lg px-3 py-2 text-center">
                {succes}
              </p>
            )}

            {/* forgot password button  */}
            <p className="text-sm font-md text-text-secondary text-start mt-6">
              {mode === "login" && (
                <Link href="/forgot-password">forgot password?</Link>
              )}
            </p>
            {/* Mode toggle */}
            <p className="text-sm text-text-secondary text-center mt-6">
              {mode === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                className="text-accent-primary font-semibold hover:underline"
              >
                {mode === "signup" ? (
                  <Link href="/login">Login</Link>
                ) : (
                  <Link href="/signup">Create One</Link>
                )}
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
