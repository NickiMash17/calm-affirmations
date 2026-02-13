import { useEffect, useMemo, useState } from "react";

interface Props {
  elapsedMs: number;
}

export default function LoadingShimmer({ elapsedMs }: Props) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setPulse((p) => p + 1), 1200);
    return () => window.clearInterval(id);
  }, []);

  const message = useMemo(() => {
    if (elapsedMs < 3000) return "Composing your affirmation...";
    if (elapsedMs < 7000) return "Still working on something thoughtful for you...";
    return "Almost there. Thanks for your patience.";
  }, [elapsedMs]);

  return (
    <div className="mt-6 glass-card rounded-2xl p-6 space-y-3" role="status" aria-live="polite">
      <div className="h-3 rounded-full animate-shimmer w-full" />
      <div className="h-3 rounded-full animate-shimmer w-4/5" style={{ animationDelay: "0.15s" }} />
      <div className="h-3 rounded-full animate-shimmer w-3/5" style={{ animationDelay: "0.3s" }} />
      <p className="text-xs text-muted-foreground/60 text-center pt-2 animate-pulse-gentle" key={pulse % 2}>
        {message}
      </p>
    </div>
  );
}
