"use client";
import ExpenseCard from "@/component/Dashboard/Expense/ExpenseCard";
import ExpenseForm from "@/component/Dashboard/Expense/ExpenseForm";
import MobileNav from "@/component/Dashboard/Navbar/MobNav";
import SideBar from "@/component/Dashboard/Navbar/SideBar";
import { useExpense } from "@/Context/ExpenseData";
import usePagination from "@/hooks/dashboard/Pagination";
import useExpenseHook from "@/hooks/dashboard/useExpense";
import { useCategoryColors } from "@/hooks/dashboard/utility/getCategoryColors";

export default function ExpenseRep({ mode }) {
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

  const { handleDel, expenseLoading } = useExpense();

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
    <>
      <div className="flex">
        <div className="hidden md:block bg-sidebar">
          <SideBar />
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>

        <div className="flex flex-col w-full p-2 mt-20 md:mt-5">
          <div className="mb-3">
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
              mode={mode}
            />
          </div>

          <div>
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
        </div>
      </div>
    </>
  );
}
