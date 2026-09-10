"use client";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import Budget from "../Dashboard/Budget/Budget";
import BudgetSummary from "../Dashboard/Budget/BudgetSummary";
import SideBar from "../Dashboard/Navbar/SideBar";

export default function BudgetRep() {
  const { budget, totalExpense, balanceBudget } = useFeatures();
  return (
    <>
      <section className="flex">
        {/* side navbar  */}
        <div className="hidden md:block">
          <SideBar />
        </div>

        {/* budget component  */}
        <div className="p-2">
          <Budget />
          <BudgetSummary
            budget={budget}
            totalExpense={totalExpense}
            balanceBudget={balanceBudget}
          />
        </div>
      </section>
    </>
  );
}
