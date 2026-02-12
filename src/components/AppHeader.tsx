import { Heart } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="text-center pt-12 pb-6 px-4 sm:pt-16 sm:pb-8">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Heart className="w-6 h-6 text-primary" strokeWidth={1.5} />
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-foreground tracking-tight">
          Live Mood Architect
        </h1>
      </div>
      <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
        A gentle space to receive words of support, crafted just for you.
      </p>
    </header>
  );
}
