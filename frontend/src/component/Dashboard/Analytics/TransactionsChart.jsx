"use client";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import { ListChecks, Calculator } from "lucide-react";
import TransactionSkeleton from "./Loaders/TransactionSkeleton";

export default function TransactionCountChart({ expenseLoading }) {
  const { expense, totalExpense } = useFeatures();

  const totalTransactions = expense.length;
  const averagePerTransaction =
    totalTransactions > 0 ? (totalExpense / totalTransactions).toFixed(0) : 0;

  if (expenseLoading) return <TransactionSkeleton />;
  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-text-primary mb-4">
        Transactions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
            <ListChecks size={16} className="text-accent-primary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Total transactions</p>
            <h3 className="text-xl font-semibold text-text-primary">
              {totalTransactions}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
            <Calculator size={16} className="text-accent-secondary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Avg per transaction</p>
            <h3 className="text-xl font-semibold text-text-primary">
              Rs. {averagePerTransaction}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
