"use client";
import { Wallet, BadgeDollarSign, ReceiptText } from "lucide-react";

export default function BudgetSummary({ budget, balanceBudget, totalExpense }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Card 1: Budget */}
      <div className="bg-balance-bg rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
            <Wallet size={16} className="text-balance-label" />
          </div>
          <p className="text-xs font-medium text-balance-label capitalize tracking-wide">
            Current month's budget
          </p>
        </div>
        <h2 className="text-2xl font-bold text-balance-text">Rs. {budget}</h2>
      </div>

      {/* Card 2: Balance */}
      <div className="bg-income-bg rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
            <BadgeDollarSign size={16} className="text-income-label" />
          </div>
          <p className="text-xs font-medium text-income-label capitalize tracking-wide">
            Remaining balance
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-income-text">
          Rs. {balanceBudget}
        </h2>
      </div>

      {/* Card 3: Total Spending */}
      <div className="bg-expense-bg rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center">
            <ReceiptText size={16} className="text-expense-label" />
          </div>
          <p className="text-xs font-medium text-expense-label capitalize tracking-wide">
            Total spendings
          </p>
        </div>
        <h2 className="text-2xl font-semibold text-expense-text">
          Rs. {totalExpense}
        </h2>
      </div>
    </section>
  );
}
