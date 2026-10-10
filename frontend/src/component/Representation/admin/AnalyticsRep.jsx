"use client";
import PieCharts from "../../Dashboard/Analytics/PieChart";
import BarCharts from "../../Dashboard/Analytics/BarChart";
import ProgressChart from "../../Dashboard/Analytics/ProgressChart";
import TransactionCountChart from "../../Dashboard/Analytics/TransactionsChart";
import SideBar from "../../Dashboard/Navbar/SideBar";
import MobileNav from "@/component/Dashboard/Navbar/MobNav";
import { useExpense } from "@/Context/ExpenseData";
import { BarChart3 } from "lucide-react";

export default function AnalyticsRep() {
  const { expenseLoading } = useExpense();
  return (
    <div className="flex">
      <div className="hidden md:block bg-sidebar">
        <SideBar />
      </div>

      <div className="block md:hidden">
        <MobileNav />
      </div>

      <div className="flex-1 flex flex-col gap-4 p-4 sm:p-6 mt-20 md:mt-0">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-text-primary">
              Analytics{" "}
            </h1>
            <BarChart3 />
          </div>
          <p className="text-sm text-text-secondary">
            Insights into your spending habits
          </p>
        </div>

        {/* Row 1 — Pie + Bar charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PieCharts expenseLoading={expenseLoading} />
          <BarCharts expenseLoading={expenseLoading} />
        </div>

        {/* Row 2 — Progress + Transaction count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ProgressChart />
          <TransactionCountChart />
        </div>
      </div>
    </div>
  );
}
