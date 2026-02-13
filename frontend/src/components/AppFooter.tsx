import { Heart, ShieldCheck } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="glass-card border-t border-border/50 mt-10">
      <div className="px-6 py-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-primary fill-primary animate-pulse-gentle" />
          <span>for your wellbeing</span>
        </div>
        <p className="text-xs text-muted-foreground/80">
          These affirmations complement but don't replace professional mental health support.
        </p>
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/70 uppercase tracking-wide">
          <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
          <span>About safety</span>
        </div>
      </div>
    </footer>
  );
}
