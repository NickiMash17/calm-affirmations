import { Heart } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="text-center pt-10 pb-4 px-4 sm:pt-14 sm:pb-6 relative z-10">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="animate-breathe">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-md">
            <Heart className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />
          </div>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-semibold text-foreground tracking-tight leading-none">
          Live Mood Architect
        </h1>
      </div>
      <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto leading-relaxed font-light italic">
        A gentle space to receive words of support, crafted just for you.
      </p>
      <div className="mt-4 mx-auto w-14 h-px bg-gradient-to-r from-primary/20 via-primary/70 to-primary/20" />
    </header>
  );
}
