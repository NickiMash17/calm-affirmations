import { ShieldCheck } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="text-center py-8 px-4 mt-6 relative z-10">
      <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/50 tracking-wide uppercase">
        <ShieldCheck className="w-3 h-3" strokeWidth={1.5} />
        <span>About safety</span>
      </div>
      <p className="text-[11px] text-muted-foreground/40 mt-1.5 max-w-xs mx-auto leading-relaxed">
        This app provides supportive affirmations, not medical advice. If you're in crisis, please reach out to a professional.
      </p>
    </footer>
  );
}
