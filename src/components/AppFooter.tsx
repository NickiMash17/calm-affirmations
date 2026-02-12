import { ShieldCheck } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className="text-center py-8 px-4 mt-8">
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>About safety:</span>
      </div>
      <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
        This app provides supportive affirmations, not medical advice. If you're in crisis, please reach out to a professional.
      </p>
    </footer>
  );
}
