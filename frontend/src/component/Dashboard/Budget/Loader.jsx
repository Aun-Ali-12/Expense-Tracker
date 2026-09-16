import { SkeletonLoader } from "../Skeleton/SkelenLoader";

export const BudgetSummarySkeleton = () => {
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-balance-bg rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <SkeletonLoader className="w-8 h-8" />
              <SkeletonLoader className="w-20 h-3" />
            </div>
            <SkeletonLoader className="w-24 h-7" />
          </div>
        ))}
      </section>
    </>
  );
};

export const BudgetComparisonSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-2 bg-card border border-border rounded-2xl p-4 sm:p-5">
        {/*icon and heading */}
        <div className="flex items-center gap-2 mb-3">
          <SkeletonLoader className="w-8 h-8 rounded-lg" />
          <SkeletonLoader className="w-24 h-4" />
        </div>

        {/* Progress bar */}
        <SkeletonLoader className="w-full h-3 rounded-full" />

        {/* Spent */}
        <div className="flex justify-between w-full mt-1">
          <SkeletonLoader className="w-16 h-3" />
          <SkeletonLoader className="w-16 h-3" />
        </div>

        {/* Remaining line */}
        <SkeletonLoader className="w-32 h-3 mt-1" />

        {/* Percentage line */}
        <SkeletonLoader className="w-20 h-2.5 mt-1" />
      </div>
    </>
  );
};
