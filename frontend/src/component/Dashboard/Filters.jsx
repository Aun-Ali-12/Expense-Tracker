import { useExpense } from "@/Context/ExpenseData";
import { useState } from "react";

export default function Filters() {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const { fetchExpense } = useExpense();
  return (
    <>
      Filters
      <section className="border-1 border-red-700">
        filter by date
        <label htmlFor="from">from:</label>
        <input
          type="date"
          name="from"
          id="from"
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        />
        <label htmlFor="to">to:</label>
        <input
          type="date"
          name="to"
          id="to"
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        {/* sends from and to date to fetch expense  */}
        <button
          onClick={() => {
            fetchExpense(from, to);
          }}
        >
          filter
        </button>
        {/* resets by calling function without any specific date range */}
        <button
          onClick={() => {
            fetchExpense();
          }}
        >
          Reset
        </button>
      </section>
    </>
  );
}
