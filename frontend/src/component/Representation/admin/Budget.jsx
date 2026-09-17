"use client";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import Budget from "../../Dashboard/Budget/Budget";
import BudgetSummary from "../../Dashboard/Budget/BudgetSummary";
import SideBar from "../../Dashboard/Navbar/SideBar";
import MobileNav from "@/component/Dashboard/Navbar/MobNav";

export default function BudgetRep() {
  const { budget, totalExpense, balanceBudget } = useFeatures();
  return (
    <>
      <section className="flex">
        {/* side navbar  */}
        <div className="hidden md:block bg-sidebar">
          <SideBar />
        </div>

        <div className="block md:hidden">
          <MobileNav />
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
