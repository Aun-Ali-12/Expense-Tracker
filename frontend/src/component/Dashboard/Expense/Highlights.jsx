"use client";
import HighlightSkeleton from "./Loader/HighlightSkeleton";

export default function TopHighlights({
  totalSpendingCategoryWise,
  highestSpendingItem,
  getCategoryColor,
  expenseLoading,
}) {
  if (expenseLoading) return <HighlightSkeleton />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {/* ---------- Section 1: Top Highlights (Category-wise spending) ---------- */}
      <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">
          Top highlights
        </h2>

        <div className="flex flex-col gap-3">
          {totalSpendingCategoryWise && totalSpendingCategoryWise.length > 0 ? (
            totalSpendingCategoryWise.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 pb-3 border-b border-border last:border-0 last:pb-0"
              >
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full truncate max-w-[60%] ${getCategoryColor(item.category)}`}
                >
                  {item.category}
                </span>
                <span className="text-sm font-semibold text-text-primary whitespace-nowrap">
                  Rs. {item.amount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary">No spending data yet.</p>
          )}
        </div>
      </section>

      {/* ---------- Section 2: Highest Spending Item per Category ---------- */}
      <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-text-primary mb-4">
          Highest spending item per category
        </h2>

        <div className="flex flex-col gap-3">
          {highestSpendingItem && highestSpendingItem.length > 0 ? (
            highestSpendingItem.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-2 pb-3 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full w-fit ${getCategoryColor(item.category)}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-text-secondary truncate">
                    {item.highestItem.note}
                  </span>
                </div>
                <span className="text-sm font-semibold text-text-primary whitespace-nowrap flex-shrink-0">
                  Rs. {item.highestItem.totalAmount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-text-secondary">No data yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
