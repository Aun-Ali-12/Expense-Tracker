//Base skeleton loader
export const SkeletonLoader = ({ className = "" }) => {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
  );
};
