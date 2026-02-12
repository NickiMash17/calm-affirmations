export default function LoadingShimmer() {
  return (
    <div className="mt-6 space-y-3" aria-hidden="true">
      <div className="h-4 rounded-md animate-shimmer w-full" />
      <div className="h-4 rounded-md animate-shimmer w-4/5" />
      <div className="h-4 rounded-md animate-shimmer w-3/5" />
    </div>
  );
}
