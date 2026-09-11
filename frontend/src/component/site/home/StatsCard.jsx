"use client";

import useCountUp from "@/hooks/site/useCountUp";

export default function StatCard({ stat }) {
  const display = useCountUp(stat.value);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-accent-primary/40 hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-2xl font-semibold text-accent-primary tabular-nums">
        {display}
      </h3>
      <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
    </div>
  );
}
