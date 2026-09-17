import { SkeletonLoader } from "../../Skeleton/SkelenLoader";

export default function BarChartSkeleton() {
  const barHeights = [55, 80, 40, 95, 65, 30, 70];

  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <SkeletonLoader className="h-4 w-56 mb-1 rounded" />
      <SkeletonLoader className="h-3 w-64 mb-4 rounded" />

      <div className="w-full h-[280px] flex items-end justify-between gap-2 sm:gap-4 px-1 pb-6 relative">
        {/* faint horizontal gridlines to echo CartesianGrid */}
        <div className="absolute inset-x-0 top-0 bottom-6 flex flex-col justify-between pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full h-px bg-border/60" />
          ))}
        </div>

        {barHeights.map((h, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 flex-1 h-full justify-end relative z-10"
          >
            <SkeletonLoader
              className="w-full max-w-[32px] rounded-t-md"
              style={{ height: `${h}%` }}
            />
            <SkeletonLoader className="h-2 w-8 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}
