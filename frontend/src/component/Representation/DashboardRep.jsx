"use client";
import ExpenseCard from "../Dashboard/ExpenseCard";
import ExpenseForm from "../Dashboard/ExpenseForm";
import { useEffect } from "react";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useExpense } from "@/Context/ExpenseData";
import Highlights from "../Dashboard/Highlights";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import Filters from "../Dashboard/Filters";
import Pagination from "../Dashboard/Pagination";
import usePagination from "@/hooks/dashboard/Pagination";
import SideBar from "../Dashboard/Navbar/SideBar";

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

  const { page, setPage, limit, setLimit, paginatedExpense, totalPages } =
    usePagination();

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <>
      <div className="flex">
        <section className="bg-sidebar">
          <SideBar />
        </section>

        <section>
          <Filters />
          <ExpenseForm
            formData={formData}
            edit={edit}
            isEdit={isEdit}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
          <ExpenseCard
            expense={paginatedExpense}
            handleDel={handleDel}
            handleEdit={handleEdit}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalPages={totalPages}
          />
          <Highlights
            totalSpendingCategoryWise={totalSpendingCategoryWise}
            highestSpendingItem={highestSpendingItem}
          />
        </section>
      </div>
    </>
  );
}
