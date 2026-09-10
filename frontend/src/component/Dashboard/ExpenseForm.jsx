"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Receipt } from "lucide-react";
export default function ExpenseForm({
  formData,
  handleChange,
  handleSubmit,
  edit,
  isEdit,
  isOpen,
  setIsOpen,
}) {
  const router = useRouter(); //use to relocate user if not loggedin

  //runs when component mounts to check if user is loggedin
  useEffect(() => {
    const token = localStorage.getItem("token"); //token from localstorage
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text-primary">
            Dashboard
          </h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-accent-primary text-white text-sm font-medium px-4 py-2.5 rounded-3xl shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            +
          </button>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className="bg-card w-full max-w-md mx-4 rounded-2xl p-7 relative shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close form"
                className="absolute top-5 right-5 text-text-secondary hover:text-text-primary hover:rotate-90 transition-all duration-200"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Receipt size={20} className="text-accent-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-text-primary">
                    Add Expense
                  </h1>
                  <p className="text-xs text-text-secondary">
                    Track your spending
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="note"
                    className="text-xs font-medium text-text-secondary uppercase tracking-wide"
                  >
                    Note
                  </label>
                  <input
                    type="text"
                    name="note"
                    id="note"
                    value={isEdit ? edit.note : formData.note}
                    onChange={handleChange}
                    placeholder="e.g. Grocery shopping"
                    className="px-3.5 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="amount"
                    className="text-xs font-medium text-text-secondary uppercase tracking-wide"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={isEdit ? edit.amount : formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="px-3.5 py-2.5 rounded-xl border border-border text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="date"
                    className="text-xs font-medium text-text-secondary uppercase tracking-wide"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={isEdit ? edit.date : formData.date}
                    onChange={handleChange}
                    className="px-3.5 py-2.5 rounded-xl border border-border text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 bg-accent-primary text-white text-sm font-semibold py-3 rounded-xl shadow-sm hover:opacity-90 hover:shadow-md active:scale-[0.98] transition-all"
                >
                  Add Expense
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
