import { SkeletonLoader } from "./Skeleton/SkelenLoader";

export function ECardSkeleton() {
  return (
    <>
      <tr className="border-b border-border">
        <td className="px-5 py-3.5">
          <SkeletonLoader className="h-4 w-16" />
        </td>
        <td className="px-5 py-3.5">
          <SkeletonLoader className="h-4 w-28" />
        </td>
        <td className="px-5 py-3.5">
          <SkeletonLoader className="h-4 w-14" />
        </td>
        <td className="px-5 py-3.5">
          <SkeletonLoader className="h-5 w-16 rounded-full" />
        </td>
        <td className="px-5 py-3.5">
          <SkeletonLoader className="h-4 w-10" />
        </td>
      </tr>
    </>
  );
}
