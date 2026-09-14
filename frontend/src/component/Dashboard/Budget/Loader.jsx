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
