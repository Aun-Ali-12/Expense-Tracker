"use client";
import ExpenseCard from "../../Dashboard/Expense/ExpenseCard";
import ExpenseForm from "../../Dashboard/Expense/ExpenseForm";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useExpense } from "@/Context/ExpenseData";
import Highlights from "../../Dashboard/Expense/Highlights";
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
    loading: expFormLoading,
    handleEdit,
    edit,
    isEdit,
    isOpen,
    setIsOpen,
    message,
    resetEdit,
    resetAdd,
  } = useExpenseHook();

  const { handleDel, loading, expenseLoading } = useExpense();

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
          expFormLoading={expFormLoading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message={message}
          resetEdit={resetEdit}
          resetAdd={resetAdd}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left — wide column: Budget summary + Expense table */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <BudgetSummary />

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
              resetEdit={resetEdit}
            />
          </div>

          {/* Right — narrow column: Highlights */}
          <div className="lg:col-span-1">
            {/* Progress + Transaction Count side by side */}
            <div className="grid grid-cols-1 gap-4 mb-2">
              <ProgressChart loading={loading} />
              <TransactionCountChart />
            </div>

            <Highlights getCategoryColor={getCategoryColor} />
          </div>
        </div>
      </section>
    </div>
  );
}
