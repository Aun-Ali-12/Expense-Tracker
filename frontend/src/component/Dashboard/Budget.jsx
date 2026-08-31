import { useExpense } from "@/Context/ExpenseData";
import useBudget from "@/hooks/dashboard/useBudget";
import { useEffect } from "react";

export default function Budget() {
  const {
    amount,
    budget,
    setAmount,
    setBudgetHandler,
    fetchBudgetHandler,
    open,
    isOpen,
  } = useBudget();

const {balanceBudget, totalExpense} = useExpense()

  useEffect(() => {
    fetchBudgetHandler();
  }, [budget]);

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
                name="budget"
                id="budget"
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
