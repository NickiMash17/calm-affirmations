export default function LoadingShimmer() {
  return (
    <div className="mt-6 glass-card rounded-2xl p-6 space-y-3" aria-hidden="true" role="status">
      <div className="h-3 rounded-full animate-shimmer w-full" />
      <div className="h-3 rounded-full animate-shimmer w-4/5" style={{ animationDelay: "0.15s" }} />
      <div className="h-3 rounded-full animate-shimmer w-3/5" style={{ animationDelay: "0.3s" }} />
      <p className="text-xs text-muted-foreground/50 text-center pt-2 animate-pulse-gentle">
        Composing your affirmation...
      </p>
    </div>
  );
}
