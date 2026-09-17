import { SkeletonLoader } from "../../Skeleton/SkelenLoader";

export default function PieChartSkeleton() {
  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <SkeletonLoader className="h-4 w-44 mb-1 rounded" />
      <SkeletonLoader className="h-3 w-56 mb-3 rounded" />

      <div className="w-full h-[280px] flex flex-col items-center justify-center gap-4">
        {/* Donut ring placeholder */}
        <div className="relative w-[190px] h-[190px] flex items-center justify-center">
          <SkeletonLoader className="w-full h-full rounded-full" />
          {/* inner cutout to mimic donut hole */}
          <div className="absolute w-[130px] h-[130px] rounded-full bg-card" />
        </div>

        {/* Legend placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <SkeletonLoader className="w-2 h-2 rounded-full" />
              <SkeletonLoader className="h-2.5 w-14 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
