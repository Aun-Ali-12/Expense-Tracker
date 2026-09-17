export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      <div className="relative w-16 h-16">
        {/* Outer ring - slow spin, light tint */}
        <div className="absolute inset-0 rounded-full border-4 border-[#0ea5e9]"></div>

        {/* Middle ring - main spin, brand color */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#0ea5e9] border-r-[#0ea5e9] animate-spin"></div>

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#0ea5e9] animate-pulse"></div>
        </div>
      </div>

      <p className="text-sm text-[#0ea5e9] font-medium tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}