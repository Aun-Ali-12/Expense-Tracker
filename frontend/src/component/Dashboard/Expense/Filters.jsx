"use client";
import { useExpense } from "@/Context/ExpenseData";
import { useEffect, useState } from "react";
import {
  Calendar,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  Filter,
} from "lucide-react";
import useExpenseCard from "@/hooks/dashboard/useExpenseCard";

export default function Filters({ mode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { fetchExpense } = useExpense();
  const [selected, setSelected] = useState("");
  const { category, fetchCategory } = useExpenseCard();
  const [catIsOpen, setCatIsOpen] = useState(false);
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <div className="flex justify-end">
        {mode !== "analytics" && (
          <div className="relative fixed-inset-0">
            <button
              onClick={() => {
                setCatIsOpen(!catIsOpen);
              }}
              className="flex items-center gap-2 bg-card border border-border text-sm text-text-primary px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <SlidersHorizontal size={15} className="text-accent-primary" />
              <ChevronDown
                size={14}
                className={`text-text-secondary transition-transform ${catIsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {catIsOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setCatIsOpen(false)}
                />
                <div className="absolute top-full mt-2 right-0 z-40 bg-card border border-border rounded-xl shadow-lg p-2">
                  <label>
                    <select
                      name="category"
                      id="category"
                      value={selected}
                      onChange={(e) => {
                        const cat = e.target.value;
                        setSelected(cat);
                        fetchExpense(from, to, cat);
                      }}
                      className="w-24 bg-card border border-border text-sm text-text-primary capitalize px-3 py-2 rounded-lg outline-none cursor-pointer hover:bg-slate-50 focus:border-accent-primary transition-colors"
                    >
                      <option value="all">all</option>
                      {category &&
                        category.map((c, index) => (
                          <option key={index} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
              </>
            )}
          </div>
        )}

        <div className="relative">
          {/* Toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-card border border-border text-sm text-text-primary px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Calendar size={15} className="text-accent-primary" />
            <ChevronDown
              size={14}
              className={`text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown panel */}
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute top-full mt-2 right-0 z-40 bg-card border border-border rounded-2xl p-4 w-64 animate-scale-in">
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
            </>
          )}
        </div>
      </div>
    </>
  );
}
