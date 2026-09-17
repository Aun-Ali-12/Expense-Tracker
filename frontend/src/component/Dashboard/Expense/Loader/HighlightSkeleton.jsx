import { SkeletonLoader } from "../../Skeleton/SkelenLoader";

export default function HighlightSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {/* ---------- Section 1: Top Highlights skeleton ---------- */}
      <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
        <SkeletonLoader className="h-4 w-32 mb-4 rounded" />

        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2 pb-3 border-b border-border last:border-0 last:pb-0"
            >
              <SkeletonLoader className="h-6 w-24 rounded-full" />
              <SkeletonLoader className="h-4 w-16 rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Section 2: Highest Spending Item skeleton ---------- */}
      <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
        <SkeletonLoader className="h-4 w-56 mb-4 rounded" />

        <div className="flex flex-col gap-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-2 pb-3 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex flex-col gap-2 min-w-0">
                <SkeletonLoader className="h-6 w-20 rounded-full" />
                <SkeletonLoader className="h-3 w-32 rounded" />
              </div>
              <SkeletonLoader className="h-4 w-14 rounded flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
