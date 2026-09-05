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
    <>
      <section
        style={{
          padding: "16px",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
        }}
      >
        <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
          Budget vs Spending
        </h2>

        {/* Progress bar track */}
        <div
          style={{
            width: "100%",
            height: 12,
            backgroundColor: "#F3F4F6",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: "100%",
              backgroundColor: getColor(),
              borderRadius: 999,
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Stats neeche */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontSize: 12,
            color: "#6B7280",
          }}
        >
          <span>Spent: Rs. {totalExpense}</span>
          <span>Budget: Rs. {budget}</span>
        </div>

        <p
          style={{
            fontSize: 12,
            marginTop: 6,
            color: balanceBudget < 0 ? "#ef4444" : "#374151",
          }}
        >
          {/* if spending gets more than budget  */}
          {balanceBudget >= 0
            ? `Remaining: Rs. ${balanceBudget}`
            : `Over budget by Rs. ${Math.abs(balanceBudget)}`}
        </p>

        <p style={{ fontSize: 11, marginTop: 4, color: "#9CA3AF" }}>
          {rawPercentage.toFixed(1)}% of budget used
        </p>
      </section>
    </>
  );
}
