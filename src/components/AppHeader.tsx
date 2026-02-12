import { Heart } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="text-center pt-10 pb-4 px-4 sm:pt-14 sm:pb-6 relative z-10">
      <div className="inline-flex items-center gap-2.5 mb-4">
        <div className="animate-breathe">
          <Heart className="w-7 h-7 text-primary" strokeWidth={1.5} fill="currentColor" fillOpacity={0.15} />
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-semibold text-foreground tracking-tight leading-none">
          Live Mood Architect
        </h1>
      </div>
      <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed font-light italic">
        A gentle space to receive words of support, crafted just for you.
      </p>
      <div className="mt-4 mx-auto w-12 h-px bg-primary/30" />
    </header>
  );
}
