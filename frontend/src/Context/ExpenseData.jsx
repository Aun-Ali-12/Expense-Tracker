"use client";
import useBudget from "@/hooks/dashboard/useBudget";
import useExpenseCard from "@/hooks/dashboard/useExpenseCard";
import { createContext, useContext, useEffect } from "react";

//create context
const ExpenseContext = createContext();

//provider
export const ExpenseProvider = ({ children }) => {
  const { expense, loading, error, fetchExpense } = useExpenseCard();
  const { budget, fetchBudgetHandler } = useBudget();

  useEffect(() => {
    fetchExpense();
    fetchBudgetHandler();
  }, []);

  console.log("expense", expense);
  console.log(budget);

  const totalExpense = expense.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  const balanceBudget = budget - totalExpense;

  return (
    <ExpenseContext.Provider value={{ totalExpense, budget, balanceBudget }}>
      {children}
    </ExpenseContext.Provider>
  );
};
export const useExpense = () => useContext(ExpenseContext);
