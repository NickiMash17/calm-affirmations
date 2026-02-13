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
        <p className="text-xs text-muted-foreground/85 max-w-md mx-auto leading-relaxed">
          This app provides supportive, non-clinical affirmations and is not a substitute for professional care.
          If you are in crisis or considering self-harm, please seek immediate help from local emergency services
          or a qualified professional in your area.
        </p>
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground/70 uppercase tracking-wide">
          <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
          <span>About safety</span>
        </div>
      </div>
    </footer>
  );
}
