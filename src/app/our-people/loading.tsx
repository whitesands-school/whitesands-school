export default function OurPeopleLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-deep pt-48 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
          <div className="h-4 w-36 bg-white/20 rounded animate-pulse" />
          <div className="h-12 w-64 bg-white/20 rounded animate-pulse" />
          <div className="h-4 w-80 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Tab bar skeleton */}
      <div className="sticky top-28 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex gap-4">
          {['Staff', 'Students', 'Parents', 'Alumni'].map((label) => (
            <div key={label} className="h-8 w-20 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>

      {/* Search + filter skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex gap-4">
        <div className="h-11 flex-1 max-w-sm bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-11 w-44 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      {/* Staff grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-20 bg-gray-100 rounded-full animate-pulse mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
