"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import PieChartSkeleton from "./Loaders/PieSkeleton";
import Filters from "../Expense/Filters";

const PIE_COLORS = ["#0EA5E9", "#2DD4BF", "#FBBF24", "#FB7185", "#8B5CF6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2 text-xs shadow-md">
        <p className="font-semibold text-text-primary mb-0.5">
          {data.category}
        </p>
        <p className="text-text-secondary">Rs. {data.amount}</p>
      </div>
    );
  }
  return null;
};

export default function PieCharts({ expenseLoading }) {
  const { totalSpendingCategoryWise: stats } = useFeatures();

  if (expenseLoading) return <PieChartSkeleton />;
  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-text-primary mb-1">
          Category wise spending
        </h2>
        <span>
          <Filters />
        </span>
      </div>
      <p className="text-xs text-text-secondary mb-3">
        How your spending is split this month
      </p>

      <div className="h-[280px]">
        {stats.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={stats}
                cx="50%"
                cy="45%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                dataKey="amount"
                nameKey="category"
                labelLine={false}
              >
                {stats &&
                  stats.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                      stroke="none"
                    />
                  ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm flex items-center justify-center h-full">
            No data found
          </p>
        )}
      </div>
    </section>
  );
}
