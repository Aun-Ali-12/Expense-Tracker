"use client";
import ExpenseCard from "../Dashboard/ExpenseCard";
import ExpenseForm from "../Dashboard/ExpenseForm";
import { useEffect } from "react";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useExpense } from "@/Context/ExpenseData";
import Highlights from "../Dashboard/Highlights";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import usePagination from "@/hooks/dashboard/Pagination";
import SideBar from "../Dashboard/Navbar/SideBar";
import BudgetSummary from "../Dashboard/Budget/BudgetSummary";
import TransactionCountChart from "../Dashboard/Analytics/TransactionsChart";
import ProgressChart from "../Dashboard/Analytics/ProgressChart";
import { useCategoryColors } from "@/hooks/dashboard/utility/getCategoryColors";

export default function DashboardRep() {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleEdit,
    edit,
    isEdit,
    isOpen,
    setIsOpen,
    message,
  } = useExpenseHook();

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

  const { getCategoryColor } = useCategoryColors();

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
          <ExpenseForm
            formData={formData}
            edit={edit}
            isEdit={isEdit}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            message={message}
          />
          <BudgetSummary
            budget={budget}
            totalExpense={totalExpense}
            balanceBudget={balanceBudget}
          />
          <Highlights
            totalSpendingCategoryWise={totalSpendingCategoryWise}
            highestSpendingItem={highestSpendingItem}
            getCategoryColor={getCategoryColor}
          />
          <ProgressChart />
          <TransactionCountChart />
          <ExpenseCard
            expense={paginatedExpense}
            handleDel={handleDel}
            handleEdit={handleEdit}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            totalPages={totalPages}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            getCategoryColor={getCategoryColor}
          />
        </section>
      </div>
    </>
  );
}
