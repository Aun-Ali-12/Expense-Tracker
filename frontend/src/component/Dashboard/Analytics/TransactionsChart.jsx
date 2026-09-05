"use client";
import { useFeatures } from "@/hooks/dashboard/useFeatures";

export default function TransactionCountChart() {
  const { expense, totalExpense } = useFeatures();

  const totalTransactions = expense.length;
  const averagePerTransaction =
    totalTransactions > 0 ? (totalExpense / totalTransactions).toFixed(0) : 0;

  return (
    <section
      style={{ padding: 16, borderRadius: 12, border: "1px solid #E5E7EB" }}
    >
      <h2 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
        Transactions
      </h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>Total Transactions</p>
          <h3 style={{ fontSize: 24, margin: 0 }}>{totalTransactions}</h3>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#9CA3AF" }}>Avg per Transaction</p>
          <h3 style={{ fontSize: 24, margin: 0 }}>
            Rs. {averagePerTransaction}
          </h3>
        </div>
      </div>
    </section>
  );
}
