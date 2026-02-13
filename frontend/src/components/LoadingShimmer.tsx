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
    <div className="mt-6 glass-card rounded-3xl p-6 sm:p-8 md:p-10 space-y-5 sm:space-y-6 animate-fade-in" role="status" aria-live="polite">
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 sm:w-14 sm:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full animate-pulse-gentle flex items-center justify-center">
          <img 
            src="/calm-logo.jpeg" 
            alt="Calm Affirmations Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover animate-breathe scale-[1.2]"
          />
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="h-6 sm:h-8 rounded-xl animate-shimmer w-full" />
        <div className="h-5 sm:h-6 rounded-xl animate-shimmer w-5/6" style={{ animationDelay: "0.2s" }} />
        <div className="h-5 sm:h-6 rounded-xl animate-shimmer w-3/4" style={{ animationDelay: "0.4s" }} />
        <div className="h-1 sm:h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-2/3 bg-primary/70 animate-shimmer" />
        </div>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground/70 text-center animate-pulse-gentle" key={pulse % 2}>
        {message}
      </p>
    </div>
  );
}
