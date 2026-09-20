"use client";
import { useExpense } from "@/Context/ExpenseData";
import { X } from "lucide-react";
import { useState } from "react";

export default function Budget() {
  const { setBudgetHandler } = useExpense();
  const [amount, setAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    await setBudgetHandler(amount);
    setAmount(0);
    setIsOpen(false);
  };
  return (
    <>
      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Header + set budget action */}
        <div className="flex sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-text-primary">Budget</h2>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-accent-primary text-white text-sm font-medium px-4 py-2.5 rounded-3xl shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            +
          </button>
        </div>
      </div>

      {/* Modal overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-6 animate-scale-in"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">
                Set monthly budget
              </h3>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Close"
                className="text-text-muted hover:text-text-secondary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mb-4">
              <label
                htmlFor="amount"
                className="text-xs font-semibold text-text-secondary"
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-primary text-sm font-medium">
                  Rs.
                </span>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={amount}
                  placeholder="e.g. 15000"
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-border bg-page text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent focus:bg-card transition-all"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-accent-primary text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Set budget
            </button>
          </div>
        </div>
      )}
    </>
  );
}
