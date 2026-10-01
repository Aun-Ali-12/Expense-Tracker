"use client";
import { LogBudget } from "@/component/Dashboard/Budget/LogBudget";
import Budget from "../../Dashboard/Budget/Budget";
import BudgetSummary from "../../Dashboard/Budget/BudgetSummary";
import SideBar from "../../Dashboard/Navbar/SideBar";
import MobileNav from "@/component/Dashboard/Navbar/MobNav";

export default function BudgetRep() {
  return (
    <>
      <section className="flex">
        {/* side navbar */}
        <div className="hidden md:block bg-sidebar">
          <SideBar />
        </div>

        <div className="block md:hidden">
          <MobileNav />
        </div>

        {/* budget component */}
        <div className="flex-1 flex flex-col items-center px-3 mt-20 md:mt-0 md:items-stretch md:px-4">
          <div className="w-full max-w-lg md:max-w-none flex flex-col gap-4">
            <Budget />
            <BudgetSummary />
          </div>

          <div>
            <LogBudget />
          </div>
        </div>
      </section>
    </>
  );
}
