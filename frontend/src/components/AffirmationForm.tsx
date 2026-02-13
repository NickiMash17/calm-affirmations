import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FEELING_PRESETS = [
  { label: "Anxious", emoji: "😟" },
  { label: "Overwhelmed", emoji: "🌊" },
  { label: "Lonely", emoji: "🌙" },
  { label: "Grateful", emoji: "🙏" },
  { label: "Hopeful", emoji: "🌱" },
  { label: "Exhausted", emoji: "🥱" },
  { label: "Peaceful", emoji: "🕊️" },
  { label: "Stressed", emoji: "😮‍💨" },
];

interface Props {
  onSubmit: (name: string, feeling: string) => void;
  isLoading: boolean;
}

export default function AffirmationForm({ onSubmit, isLoading }: Props) {
  const [name, setName] = useState("");
  const [feeling, setFeeling] = useState("");
  const [errors, setErrors] = useState<{ name?: string; feeling?: string }>({});

  const validate = (): boolean => {
    const next: typeof errors = {};
    const trimmedName = name.trim();
    const trimmedFeeling = feeling.trim();

    if (!trimmedName) next.name = "Please share your name so we can personalize your affirmation.";
    else if (trimmedName.length > 60) next.name = "Name should be 60 characters or fewer.";

    if (!trimmedFeeling) next.feeling = "Let us know how you're feeling today.";
    else if (trimmedFeeling.length > 280) next.feeling = "Please keep this to 280 characters or fewer.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(name.trim(), feeling.trim());
    }
  };

  const selectPreset = (preset: string) => {
    setFeeling(preset);
    setErrors((prev) => ({ ...prev, feeling: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up" noValidate>
      <div className="space-y-3">
        <Label htmlFor="name" className="text-sm font-medium text-foreground/80 tracking-wide uppercase text-[11px]">
          Your name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Jordan"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
          }}
          maxLength={60}
          disabled={isLoading}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="bg-background/60 border-border/70 rounded-xl h-12 px-4 text-base
            focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300
            placeholder:text-muted-foreground/50"
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-warning animate-fade-in-up" role="alert" style={{ animationDuration: "0.3s" }}>
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label htmlFor="feeling" className="text-sm font-medium text-foreground/80 tracking-wide uppercase text-[11px]">
          How are you feeling?
        </Label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Quick feeling options">
          {FEELING_PRESETS.map(({ label, emoji }) => (
            <button
              key={label}
              type="button"
              onClick={() => selectPreset(label)}
              disabled={isLoading}
              className={`feeling-chip ${
                feeling === label ? "feeling-chip-active" : "feeling-chip-inactive"
              } text-[11px] sm:text-xs`}
            >
              <span className="mr-1">{emoji}</span> {label}
            </button>
          ))}
        </div>
        <Textarea
          id="feeling"
          placeholder="Or describe what's on your mind..."
          value={feeling}
          onChange={(e) => {
            setFeeling(e.target.value);
            if (errors.feeling) setErrors((p) => ({ ...p, feeling: undefined }));
          }}
          maxLength={280}
          rows={4}
          disabled={isLoading}
          aria-invalid={!!errors.feeling}
          aria-describedby={errors.feeling ? "feeling-error" : undefined}
          className="bg-background/60 border-border/70 rounded-xl px-4 py-3 text-base
            focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300
            placeholder:text-muted-foreground/50 resize-none"
        />
        <div className="flex justify-between items-center">
          {errors.feeling ? (
            <p id="feeling-error" className="text-sm text-warning animate-fade-in-up" role="alert" style={{ animationDuration: "0.3s" }}>
              {errors.feeling}
            </p>
          ) : (
            <span className="text-xs text-muted-foreground/70">
              Take your time. There's no rush.
            </span>
          )}
          <span className="text-[10px] text-muted-foreground/60 tabular-nums">{feeling.length}/280</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary-glow w-full h-13 sm:h-14 rounded-xl text-sm font-medium
          bg-primary text-primary-foreground
          focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none
          disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="loading-dots">
              <span />
              <span />
              <span />
            </span>
            <span>Creating your affirmation</span>
          </span>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate affirmation</span>
          </>
        )}
      </button>
    </form>
  );
}
