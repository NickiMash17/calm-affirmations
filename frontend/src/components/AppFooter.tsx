import { Heart, ShieldCheck } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="glass-card border-t border-border/50 mt-8 sm:mt-10">
      <div className="px-4 sm:px-6 py-6 sm:py-8 text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-2">
          <img 
            src="/calm-logo.jpeg" 
            alt="Calm Affirmations Logo" 
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
          />
          <span className="text-xs sm:text-sm text-muted-foreground">Made with love for your wellbeing</span>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground/85 max-w-xs sm:max-w-md mx-auto leading-relaxed">
          This app provides supportive, non-clinical affirmations and is not a substitute for professional care.
          If you are in crisis or considering self-harm, please seek immediate help from local emergency services
          or a qualified professional in your area.
        </p>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-muted-foreground/70 uppercase tracking-wide">
          <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={1.5} />
          <span>About safety</span>
        </div>
      </div>
    </footer>
  );
}
