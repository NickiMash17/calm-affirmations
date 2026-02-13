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
    <div className="mt-6 glass-card rounded-3xl p-8 sm:p-10 space-y-6 animate-fade-in" role="status" aria-live="polite">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse-gentle flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full animate-breathe" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-8 rounded-xl animate-shimmer w-full" />
        <div className="h-6 rounded-xl animate-shimmer w-5/6" style={{ animationDelay: "0.2s" }} />
        <div className="h-6 rounded-xl animate-shimmer w-3/4" style={{ animationDelay: "0.4s" }} />
      </div>
      <p className="text-sm text-muted-foreground/70 text-center animate-pulse-gentle" key={pulse % 2}>
        {message}
      </p>
    </div>
  );
}
