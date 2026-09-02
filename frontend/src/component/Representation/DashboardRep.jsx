"use client";
import ExpenseCard from "../Dashboard/ExpenseCard";
import ExpenseForm from "../Dashboard/ExpenseForm";
import Budget from "../Dashboard/Budget";
import { useEffect } from "react";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useExpense } from "@/Context/ExpenseData";
import Highlights from "../Dashboard/Highlights";
import { useFeatures } from "@/hooks/dashboard/useFeatures";

export default function DashboardRep() {
  const { formData, handleChange, handleSubmit, handleEdit, edit, isEdit } =
    useExpenseHook();

  const { expense, fetchExpense, handleDel } = useExpense();

  const {
    totalSpendingCategoryWise,
    budget,
    totalExpense,
    balanceBudget,
    highestSpendingItem,
  } = useFeatures();

  useEffect(() => {
    fetchExpense();
  }, []);
console.log(highestSpendingItem);

  return (
    <>
      <Budget
        budget={budget}
        totalExpense={totalExpense}
        balanceBudget={balanceBudget}
      />
      <ExpenseForm
        formData={formData}
        edit={edit}
        isEdit={isEdit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ExpenseCard
        expense={expense}
        handleDel={handleDel}
        handleEdit={handleEdit}
      />
      <Highlights totalSpendingCategoryWise={totalSpendingCategoryWise} highestSpendingItem={highestSpendingItem} />
    </>
  );
}
