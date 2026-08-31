"use client";
import useExpense from "@/hooks/dashboard/useExpense";
import ExpenseCard from "../Dashboard/ExpenseCard";
import ExpenseForm from "../Dashboard/ExpenseForm";
import Budget from "../Dashboard/Budget";
import useExpenseCard from "@/hooks/dashboard/useExpenseCard";
import { useEffect } from "react";

export default function DashboardRep() {
  const { formData, handleChange, handleSubmit, handleEdit, edit, isEdit } =
    useExpense();
  const { expense, fetchExpense, handleDel } = useExpenseCard();
  useEffect(() => {
    fetchExpense();
  }, []);

  useEffect(() => {
    console.log(edit);
  }, [edit]);

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
    </>
  );
}
