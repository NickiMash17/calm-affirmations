import { Heart } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="glass-card border-b border-border/50 sticky top-0 z-40 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center overflow-hidden">
            <img
              src="/logo.png"
              alt="Calm Affirmations logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">
            Calm Affirmations
          </h1>
        </div>
      </div>
    </header>
  );
}
