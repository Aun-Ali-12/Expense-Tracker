"use client";

import useExpenseCard from "@/hooks/dashboard/useExpenseCard";
import { useEffect } from "react";

export default function ExpenseCard() {
  const { expense, fetchExpense, handleDel } = useExpenseCard();
  useEffect(() => {
    fetchExpense();
    // console.log(expense);
  }, []);

  useEffect(() => {
    fetchExpense();
    // console.log(expense);
  }, []);

  return (
    <>
      <section>
        <h1>Your Expense</h1>

        {/* table  */}
        <table>
          <thead>
            <tr>
              <td>note</td>
              <td>amount</td>
              <td>category</td>
              <td>actions</td>
            </tr>
          </thead>
          {/* expense body  */}
          <tbody>
            {expense &&
              expense.map((e, index) => (
                <tr key={index}>
                  <td>{e.note}</td>
                  <td>{e.amount}</td>
                  <td>{e.category}</td>
                  <td>
                    <button>edit</button>
                    <button
                      onClick={() => {
                        handleDel(e._id);
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
