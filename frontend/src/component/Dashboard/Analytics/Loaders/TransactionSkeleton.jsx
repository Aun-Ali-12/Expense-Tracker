import { SkeletonLoader } from "../../Skeleton/SkelenLoader";

export default function TransactionSkeleton() {
  return (
    <section className="bg-card border border-border rounded-2xl p-4 sm:p-5">
      <SkeletonLoader className="h-4 w-28 mb-4 rounded" />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <SkeletonLoader className="w-9 h-9 rounded-lg flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <SkeletonLoader className="h-3 w-18 rounded" />
            <SkeletonLoader className="h-8 w-12 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SkeletonLoader className="w-9 h-9 rounded-lg flex-shrink-0" />
          <div className="flex flex-col gap-2">
            <SkeletonLoader className="h-3 w-18 rounded" />
            <SkeletonLoader className="h-8 w-12 rounded" />
          </div>
        </div>
      </div>
    </section>
  );
}
