"use client";
import ExpenseCard from "../../Dashboard/ExpenseCard";
import ExpenseForm from "../../Dashboard/ExpenseForm";
import { useEffect } from "react";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useExpense } from "@/Context/ExpenseData";
import Highlights from "../../Dashboard/Highlights";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import usePagination from "@/hooks/dashboard/Pagination";
import SideBar from "../../Dashboard/Navbar/SideBar";
import BudgetSummary from "../../Dashboard/Budget/BudgetSummary";
import TransactionCountChart from "../../Dashboard/Analytics/TransactionsChart";
import ProgressChart from "../../Dashboard/Analytics/ProgressChart";
import { useCategoryColors } from "@/hooks/dashboard/utility/getCategoryColors";
import MobileNav from "../../Dashboard/Navbar/MobNav";

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
    resetEdit,
  } = useExpenseHook();

  const { fetchExpense, handleDel, loading, expenseLoading } = useExpense();

  const {
    totalSpendingCategoryWise,
    budget,
    totalExpense,
    balanceBudget,
    highestSpendingItem,
  } = useFeatures();

  const {
    page,
    setPage,
    limit,
    setLimit,
    paginatedExpense,
    totalPages,
    expense,
  } = usePagination();

  const { getCategoryColor } = useCategoryColors();

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <div className="flex">
      <div className="hidden md:block bg-sidebar">
        <SideBar />
      </div>

      <div className="block md:hidden">
        <MobileNav />
      </div>

      <section className="flex-1 flex flex-col gap-4 p-2 sm:p-6 mt-20 md:mt-0">
        <ExpenseForm
          formData={formData}
          edit={edit}
          isEdit={isEdit}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message={message}
          resetEdit={resetEdit}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left — wide column: Budget summary + Expense table */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <BudgetSummary
              budget={budget}
              totalExpense={totalExpense}
              balanceBudget={balanceBudget}
              loading={loading}
              expenseLoading={expenseLoading}
            />

            <ExpenseCard
              paginatedData={paginatedExpense}
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
              expense={expense}
              expenseLoading={expenseLoading}
            />
          </div>

          {/* Right — narrow column: Highlights */}
          <div className="lg:col-span-1">
            {/* Progress + Transaction Count side by side */}
            <div className="grid grid-cols-1 gap-4 mb-2">
              <ProgressChart loading={loading} />
              <TransactionCountChart />
            </div>

            <Highlights
              totalSpendingCategoryWise={totalSpendingCategoryWise}
              highestSpendingItem={highestSpendingItem}
              getCategoryColor={getCategoryColor}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
