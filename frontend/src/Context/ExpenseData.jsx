"use client";
import useBudget from "@/hooks/dashboard/useBudget";
import useExpenseCard from "@/hooks/dashboard/useExpenseCard";
import { createContext, useContext, useEffect } from "react";

//create context
const ExpenseContext = createContext();

//provider
export const ExpenseProvider = ({ children }) => {
  const { expense, setExpense, loading, error, fetchExpense, handleDel } =
    useExpenseCard();
  const {
    budget,
    fetchBudgetHandler,
    amount,
    setAmount,
    setBudgetHandler,
    isOpen,
    setIsOpen,
  } = useBudget();

  useEffect(() => {
    fetchExpense();
    fetchBudgetHandler();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        budget,
        expense,
        setExpense,
        fetchExpense,
        handleDel,
        fetchBudgetHandler,
        amount,
        setAmount,
        setBudgetHandler,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
export const useExpense = () => useContext(ExpenseContext);
