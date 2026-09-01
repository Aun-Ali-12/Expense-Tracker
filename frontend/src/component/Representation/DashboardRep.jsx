"use client";
import ExpenseCard from "../Dashboard/ExpenseCard";
import ExpenseForm from "../Dashboard/ExpenseForm";
import Budget from "../Dashboard/Budget";
import { useEffect } from "react";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useExpense } from "@/Context/ExpenseData";
import Highlights from "../Dashboard/Highlights";

export default function DashboardRep() {
  const { formData, handleChange, handleSubmit, handleEdit, edit, isEdit } =
    useExpenseHook();
  const { expense, fetchExpense, handleDel } = useExpense();
  // const { expense, fetchExpense, handleDel } = useExpenseCard();

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <>
      <Budget />
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
      <Highlights />
    </>
  );
}
