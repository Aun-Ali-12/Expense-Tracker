"use client";
import { useFeatures } from "@/hooks/dashboard/useFeatures";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2 text-xs shadow-md max-w-[180px]">
        <p className="font-semibold text-text-primary mb-0.5">
          {data.category}
        </p>
        <p className="text-text-primary">Rs. {data.highestItem.totalAmount}</p>
        <p className="text-text-secondary mt-0.5 truncate">
          {data.highestItem.note}
        </p>
      </div>
    );
  }
  return null;
};

export default function BarCharts() {
  const { highestSpendingItem: stats } = useFeatures();

  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <h2 className="text-sm font-semibold text-text-primary mb-1">
        Highest spending item per category
      </h2>
      <p className="text-xs text-text-secondary mb-3">
        Your biggest single purchase in each category
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={stats}
          margin={{ top: 5, right: 8, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F1F5F9"
            vertical={false}
          />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94A3B8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E0F2FE" }} />
          <Bar
            dataKey={(entry) => entry.highestItem.totalAmount}
            fill="#0EA5E9"
            name="Highest spending item"
            barSize={32}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
