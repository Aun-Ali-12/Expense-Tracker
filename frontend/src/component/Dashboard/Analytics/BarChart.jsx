"use client";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          border: "1px solid #E5E7EB",
          padding: "8px 12px",
          fontSize: 12,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
        }}
      >
        <p style={{ fontWeight: 600, margin: 0 }}>{data.category}</p>
        <p style={{ margin: "4px 0 0" }}>
          Amount: {data.highestItem.totalAmount}
        </p>
        <p style={{ margin: "2px 0 0", color: "#6B7280" }}>
          {data.highestItem.note}
        </p>
      </div>
    );
  }
  return null;
};

export default function BarCharts() {
  const { highestSpendingItem: stats } = useFeatures();
  console.log(stats);

  return (
    <>
      <h2>Highest Spending Items Of Each Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={stats}
          margin={{ top: 5, right: 100, left: 100, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F3F4F6"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#DCFCE7" }} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar
            dataKey={(entry) => entry.highestItem.totalAmount}
            fill="#22c55e"
            name="Highest Spending Item"
            barSize={36}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
