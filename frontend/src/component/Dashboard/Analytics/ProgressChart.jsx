"use client";
import useBudgetProgress from "@/hooks/dashboard/Analytics/useBudgetProgress";

export default function ProgressChart() {
  const {
    rawPercentage,
    percentage,
    getColor,
    totalExpense,
    budget,
    balanceBudget,
  } = useBudgetProgress();

  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-text-primary mb-3">
        Budget vs spending
      </h2>

      {/* Progress bar track */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: getColor() }}
        />
      </div>

      {/* Stats neeche */}
      <div className="flex justify-between mt-2.5 text-xs text-text-secondary">
        <span>Spent: Rs. {totalExpense}</span>
        <span>Budget: Rs. {budget}</span>
      </div>

      <p
        className={`text-xs mt-1.5 ${balanceBudget < 0 ? "text-rose-600" : "text-text-primary"}`}
      >
        {balanceBudget >= 0
          ? `Remaining: Rs. ${balanceBudget}`
          : `Over budget by Rs. ${Math.abs(balanceBudget)}`}
      </p>

      <p className="text-[11px] mt-1 text-text-secondary/70">
        {rawPercentage.toFixed(1)}% of budget used
      </p>
    </section>
  );
}
