import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FEELING_PRESETS = [
  "Anxious",
  "Overwhelmed",
  "Lonely",
  "Grateful",
  "Hopeful",
  "Exhausted",
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
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-foreground">
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
          className="bg-background border-border focus:ring-2 focus:ring-ring/30 transition-shadow"
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-warning" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="feeling" className="text-sm font-medium text-foreground">
          How are you feeling?
        </Label>
        <div className="flex flex-wrap gap-2 mb-2" role="group" aria-label="Quick feeling options">
          {FEELING_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => selectPreset(preset)}
              disabled={isLoading}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200
                ${feeling === preset
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground"
                }
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {preset}
            </button>
          ))}
        </div>
        <Textarea
          id="feeling"
          placeholder="Describe what's on your mind…"
          value={feeling}
          onChange={(e) => {
            setFeeling(e.target.value);
            if (errors.feeling) setErrors((p) => ({ ...p, feeling: undefined }));
          }}
          maxLength={280}
          rows={3}
          disabled={isLoading}
          aria-invalid={!!errors.feeling}
          aria-describedby={errors.feeling ? "feeling-error" : undefined}
          className="bg-background border-border focus:ring-2 focus:ring-ring/30 transition-shadow resize-none"
        />
        <div className="flex justify-between items-center">
          {errors.feeling ? (
            <p id="feeling-error" className="text-sm text-warning" role="alert">
              {errors.feeling}
            </p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground">{feeling.length}/280</span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 
          active:scale-[0.98] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating something supportive for you…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Generate affirmation
          </span>
        )}
      </Button>
    </form>
  );
}
