import { Quote } from "lucide-react";

interface Props {
  affirmation: string;
  name: string;
}

export default function AffirmationResult({ affirmation, name }: Props) {
  return (
    <div className="animate-fade-in-up mt-6">
      <div className="rounded-lg border border-border bg-accent/40 p-6 sm:p-8 space-y-3">
        <Quote className="w-5 h-5 text-primary/60" strokeWidth={1.5} />
        <p className="text-foreground text-base sm:text-lg leading-relaxed font-light">
          {affirmation}
        </p>
        <p className="text-xs text-muted-foreground pt-1">
          — for {name}
        </p>
      </div>
    </div>
  );
}
