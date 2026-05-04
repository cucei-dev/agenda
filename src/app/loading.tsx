export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
      {/* Hero section skeleton */}
      <div className="mb-16">
        <div className="h-12 md:h-14 bg-surface-container-high rounded-lg w-3/4 mb-8" />
        <div className="h-12 bg-surface-container-high rounded-lg w-full max-w-xl" />
        <div className="mt-3 h-4 bg-surface-container-high rounded w-72" />
        <div className="mt-6 flex gap-3">
          <div className="h-8 bg-surface-container-high rounded-full w-20" />
          <div className="h-8 bg-surface-container-high rounded-full w-32" />
          <div className="h-8 bg-surface-container-high rounded-full w-28" />
          <div className="h-8 bg-surface-container-high rounded-full w-36" />
        </div>
      </div>

      {/* Results grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-xl p-6 shadow-sm space-y-4"
          >
            <div className="h-4 bg-surface-container-high rounded w-16" />
            <div className="h-6 bg-surface-container-high rounded w-3/4" />
            <div className="h-4 bg-surface-container-high rounded w-1/2" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-surface-container-high rounded-full w-24" />
              <div className="h-6 bg-surface-container-high rounded-full w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
