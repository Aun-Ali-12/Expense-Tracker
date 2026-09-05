"use client";
import { useExpense } from "@/Context/ExpenseData";
import { useFeatures } from "@/hooks/dashboard/useFeatures";

export default function Budget() {
  const { amount, setAmount, setBudgetHandler, open, isOpen } = useExpense();
  const { budget, totalExpense, balanceBudget } = useFeatures();
  return (
    <>
      <section>
        <h2>Budget Section</h2>

        {/* budget input  */}
        <div>
          <button
            onClick={() => {
              isOpen(!open);
            }}
          >
            set your budget
          </button>
          {open && (
            <>
              <input
                type="number"
                name="amount"
                id="amount"
                value={amount}
                placeholder="set your budget"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <button onClick={setBudgetHandler}>set budget</button>
            </>
          )}
        </div>
      </section>

      <section>
        <h2>Your Budget for this month: {budget}</h2>
        <h2>Your Balance: {balanceBudget}</h2>
        <h2>Total spendings: {totalExpense}</h2>
      </section>
    </>
  );
}
