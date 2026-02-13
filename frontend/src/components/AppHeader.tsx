import { Heart } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="text-center pt-6 sm:pt-8 md:pt-10 lg:pt-14 pb-3 sm:pb-4 md:pb-5 lg:pb-6 px-4 relative z-10">
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="animate-breathe">
          <img 
            src="/calm-logo.jpeg" 
            alt="Calm Affirmations Logo" 
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover shadow-md scale-[1.18]"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground tracking-tight leading-none">
          Calm Affirmations
        </h1>
      </div>
      <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-xs sm:max-w-sm mx-auto leading-relaxed font-light italic">
        A gentle space to receive words of support, crafted just for you.
      </p>
      <div className="mt-4 mx-auto w-14 h-px bg-gradient-to-r from-primary/20 via-primary/70 to-primary/20" />
    </header>
  );
}
