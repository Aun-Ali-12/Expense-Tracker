"use client";

import { useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, Minus, RefreshCw } from "lucide-react";
import { useLogBudget } from "@/hooks/dashboard/Budget/useLogBudget";
import { RowSkeleton } from "./Loader";

const fmtMoney = (n) => `Rs. ${Number(n || 0).toLocaleString("en-PK")}`;

const fmtDate = (d) => {
  const date = new Date(d);
  return isNaN(date)
    ? ""
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

// "2026-10" -> "October 2026" (agar format alag ho to raw value dikhegi)
const fmtMonth = (m) => {
  if (typeof m === "string" && /^\d{4}-\d{2}$/.test(m)) {
    const [y, mo] = m.split("-").map(Number);
    return new Date(y, mo - 1, 1).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
  }
  const parsed = new Date(m);
  return isNaN(parsed)
    ? String(m ?? "")
    : parsed.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
};

const currentMonthKey = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}`;
};

// pichle (purane) month ke muqable change
function Change({ diff }) {
  if (diff === null)
    return <span className="text-xs text-text-muted">First budget</span>;
  if (diff === 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
        <Minus size={13} /> Same as previous month
      </span>
    );
  const up = diff > 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
        up
          ? "bg-income-bg text-income-label"
          : "bg-expense-bg text-expense-label"
      }`}
    >
      {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
      {fmtMoney(Math.abs(diff))} {up ? "more" : "less"} than previous month
    </span>
  );
}

export function LogBudget() {
  const { fetchAllBudget, allBudget, msg, loading } = useLogBudget();

  useEffect(() => {
    fetchAllBudget();
    console.log("all budget");
  }, [fetchAllBudget]);

  const thisMonth = currentMonthKey();

  return (
    <section className="bg-card border border-border rounded-xl mt-4 sm:rounded-2xl overflow-hidden w-full">
      <header className="px-4 py-3 sm:px-5 sm:py-4 border-b border-border flex flex-wrap items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-text-primary">
            Monthly Budget History
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Your budget for each month, newest first.
          </p>
        </div>
        {!loading && allBudget.length > 0 && (
          <span className="shrink-0 text-xs font-medium text-balance-label bg-balance-bg px-2.5 py-1 rounded-full whitespace-nowrap">
            {allBudget.length} {allBudget.length === 1 ? "month" : "months"}
          </span>
        )}
      </header>

      {loading ? (
        <ul className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <RowSkeleton key={i} />
          ))}
        </ul>
      ) : msg ? (
        <div className="px-4 py-8 sm:px-5 sm:py-10 text-center">
          <p className="text-sm text-text-primary font-medium break-words">
            {msg}
          </p>
          <button
            onClick={fetchAllBudget}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:underline"
          >
            <RefreshCw size={14} /> Try again
          </button>
        </div>
      ) : allBudget.length === 0 ? (
        <div className="px-4 py-10 sm:px-5 sm:py-12 text-center">
          <p className="text-text-primary font-medium">No budget set yet</p>
          <p className="mt-1 text-xs sm:text-sm text-text-secondary">
            Add a budget for this month and it will show up here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {allBudget.map((b, i) => {
            const older = allBudget[i + 1]; // extracts older one
            const diff = older ? Number(b.amount) - Number(older.amount) : null; //diff between current and last month budget
            const isCurrent = b.month === thisMonth;
            const edited =
              b.updatedAt &&
              b.createdAt &&
              new Date(b.updatedAt) - new Date(b.createdAt) > 60 * 1000;

            return (
              <li
                key={b._id}
                className={`px-4 py-3 sm:px-5 sm:py-4 flex flex-row items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors ${
                  isCurrent ? "bg-balance-bg/40" : ""
                }`}
              >
                {/* Left: month + dates */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-medium text-sm sm:text-base text-text-primary truncate">
                      {fmtMonth(b.month)}
                    </p>
                    {isCurrent && (
                      <span className="shrink-0 text-xs font-medium text-balance-label bg-balance-bg px-2 py-0.5 rounded-full">
                        This month
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-text-muted leading-snug">
                    <span className="block sm:inline">
                      Set on {fmtDate(b.createdAt)}
                    </span>
                    {edited && (
                      <span className="block sm:inline">
                        <span className="hidden sm:inline"> · </span>
                        Edited on {fmtDate(b.updatedAt)}
                      </span>
                    )}
                  </p>
                </div>

                {/* Right: amount + change */}
                <div className="flex flex-col items-end gap-0.5 sm:gap-1 shrink-0 text-right">
                  <p className="text-base sm:text-lg font-semibold text-text-primary whitespace-nowrap">
                    {fmtMoney(b.amount)}
                  </p>
                  <Change diff={diff} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
