export default function NewsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-deep pt-48 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
          <div className="h-4 w-36 bg-white/20 rounded animate-pulse" />
          <div className="h-12 w-72 bg-white/20 rounded animate-pulse" />
          <div className="h-4 w-56 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="sticky top-[88px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex gap-2">
          {[80, 48, 72, 64, 80, 56, 60].map((w, i) => (
            <div
              key={i}
              style={{ width: w }}
              className="h-8 bg-gray-100 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Featured post skeleton */}
        <div className="grid lg:grid-cols-5 rounded-xl overflow-hidden border border-gray-100 mb-14">
          <div className="lg:col-span-3 h-64 lg:h-80 bg-gray-100 animate-pulse" />
          <div className="lg:col-span-2 p-8 lg:p-12 space-y-4 bg-white">
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-6 w-28 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-8 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-gray-100 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-gray-100 rounded animate-pulse mt-4" />
          </div>
        </div>

        {/* News grid skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-100 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="flex gap-3">
                  <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-5 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
                <div className="h-6 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-4/5 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
