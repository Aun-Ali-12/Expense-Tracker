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

export default function PieCharts() {
  const { totalSpendingCategoryWise: stats } = useFeatures();
  const PieColor = ["#f59e0b", "#ef4444", "#22c55e"];
  return (
    <>
      <section>
        <h2>category wise spending</h2>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={stats}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={95}
              dataKey="amount"
              nameKey="category"
              label={({ category, amount }) => `${category}: ${amount}`}
              labelLine={false}
            >
              {stats.map((entry, index) => (
                <Cell key={index} fill={PieColor[index % PieColor.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontSize: 12,
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={12}
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </section>
    </>
  );
}
