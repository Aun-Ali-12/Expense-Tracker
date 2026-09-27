"use client";
import useBudget from "@/hooks/dashboard/useBudget";
import useExpenseCard from "@/hooks/dashboard/useExpenseCard";
import { createContext, useContext, useEffect, useMemo } from "react";

//create context
const ExpenseContext = createContext();

//provider
export const ExpenseProvider = ({ children }) => {
  const {
    expense,
    setExpense,
    loading: expenseLoading,
    fetchExpense,
    handleDel,
  } = useExpenseCard();
  const { budget, fetchBudgetHandler, setBudgetHandler, loading } = useBudget();

  useEffect(() => {
    fetchExpense();
    fetchBudgetHandler();
  }, []);

  //features calculations
  const uniqueCategory = [...new Set(expense.map((e) => e?.category))];

  //total Expense of the user
  const totalExpense = useMemo(() => {
    return expense.reduce((sum, item) => {
      return sum + item?.amount;
    }, 0);
  }, [expense]);

  //remaining budget of the user
  const balanceBudget = Number(budget) - Number(totalExpense);

  //total spendings category wise:
  const totalSpendingCategoryWise = useMemo(() => {
    return uniqueCategory.map((i) => ({
      category: i,
      amount: expense
        .filter((c) => c?.category === i)
        .reduce((acc, item) => acc + item?.amount, 0),
    }));
  }, [expense]);

  //highest spending item from each category:
  const highestSpendingItem = useMemo(() => {
    return uniqueCategory.map((c) => {
      //returns whole object of expense category wise
      const itemsInCategory = expense.filter((i) => i?.category === c);

      //creates object in which returns every item with its overall spendings
      const itemTotal = itemsInCategory.reduce((acc, item) => {
        const itemName = item?.note?.toLowerCase().trim(); //converts note in lowercase and removes extra space

        //if acc already has
        if (!acc[itemName]) {
          acc[itemName] = {
            note: item?.note,
            totalAmount: 0,
          };
        }
        acc[itemName].totalAmount += item?.amount;
        return acc;
      }, {});

      //takes out highest spended item of each category
      const highestItem = Object.values(itemTotal).reduce((max, item) => {
        return item?.totalAmount > max?.totalAmount ? item : max;
      });

      //data returned by map
      return {
        category: c,
        highestItem,
      };
    });
  }, [expense]);

  const contextValue = useMemo(
    () => ({
      budget,
      expense,
      setExpense,
      fetchExpense,
      handleDel,
      fetchBudgetHandler,
      setBudgetHandler,
      loading,
      expenseLoading,
      totalExpense,
      balanceBudget,
      totalSpendingCategoryWise,
      highestSpendingItem,
    }),
    [
      budget,
      expense,
      setExpense,
      fetchExpense,
      handleDel,
      fetchBudgetHandler,
      setBudgetHandler,
      loading,
      expenseLoading,
      totalExpense,
      balanceBudget,
      totalSpendingCategoryWise,
      highestSpendingItem,
    ],
  );

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};
export const useExpense = () => useContext(ExpenseContext);
