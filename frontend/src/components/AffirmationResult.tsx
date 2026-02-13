import { Quote } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

interface Props {
  affirmation: string;
  name: string;
}

export default function AffirmationResult({ affirmation, name }: Props) {
  const { displayed, isDone } = useTypewriter(affirmation, 90);

  return (
    <div className="animate-scale-in mt-6">
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-primary/50 mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="space-y-3 min-h-[60px]">
            <p className="text-foreground text-base sm:text-lg leading-relaxed font-light">
              {displayed}
              {!isDone && <span className="typewriter-cursor" />}
            </p>
            {isDone && (
              <p className="text-[11px] text-muted-foreground/70 animate-fade-in tracking-wide uppercase">
                crafted for {name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
