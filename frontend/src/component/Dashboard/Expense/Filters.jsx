"use client";
import { useExpense } from "@/Context/ExpenseData";
import { useState } from "react";
import { Calendar, Filter, RotateCcw, ChevronDown } from "lucide-react";

export default function Filters() {
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { fetchExpense } = useExpense();

  return (
    <>
      <div className="relative">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-card border border-border text-sm text-text-primary px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <Calendar size={15} className="text-accent-primary" />
          Filter by date
          <ChevronDown
            size={14}
            className={`text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div className="absolute top-full mt-2 left-0 z-40 bg-card border border-border rounded-2xl p-4 w-64 animate-scale-in">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="from"
                  className="text-xs font-medium text-text-secondary uppercase tracking-wide"
                >
                  From
                </label>
                <input
                  type="date"
                  name="from"
                  id="from"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="to"
                  className="text-xs font-medium text-text-secondary uppercase tracking-wide"
                >
                  To
                </label>
                <input
                  type="date"
                  name="to"
                  id="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                />
              </div>

              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => {
                    fetchExpense(from, to);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-accent-primary text-white text-sm font-medium py-2 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <Filter size={13} />
                  Filter
                </button>

                <button
                  onClick={() => {
                    setFrom("");
                    setTo("");
                    fetchExpense();
                  }}
                  aria-label="Reset filter"
                  className="flex items-center justify-center p-2 rounded-lg border border-border text-text-secondary hover:bg-slate-50 hover:text-text-primary transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
