import { useState } from "react";
import { Copy, Share2, CheckCircle2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTypewriter } from "@/hooks/use-typewriter";

interface Props {
  affirmation: string;
  name: string;
}

export default function AffirmationResult({ affirmation, name }: Props) {
  const { displayed, isDone } = useTypewriter(affirmation, 35);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affirmation);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Your affirmation is ready to share.",
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      await handleCopy();
      return;
    }

    try {
      await navigator.share({
        title: "My affirmation",
        text: affirmation,
      });
    } catch {
      // User dismissed share.
    }
  };

  return (
    <div className="affirmation-card mt-6 space-y-6 relative">
      {/* Floating hearts around the result */}
      <div className="absolute -top-4 -left-4 w-8 h-8 text-primary/40 animate-pulse-gentle">
        <Heart className="w-full h-full fill-primary/25" strokeWidth={1} />
      </div>
      <div className="absolute -top-2 -right-6 w-6 h-6 text-secondary/40 animate-pulse-gentle" style={{ animationDelay: "1s" }}>
        <Heart className="w-full h-full fill-secondary/25" strokeWidth={1} />
      </div>
      <div className="absolute -bottom-2 -left-6 w-7 h-7 text-accent/40 animate-pulse-gentle" style={{ animationDelay: "2s" }}>
        <Heart className="w-full h-full fill-accent/25" strokeWidth={1} />
      </div>

      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-gentle" />
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Your affirmation, {name}
        </h3>
        <p className="text-sm text-muted-foreground">Take a deep breath and read this slowly.</p>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-2xl rounded-3xl" />
        <div className="relative glass-card p-6 sm:p-8 rounded-2xl">
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-center font-medium whitespace-pre-wrap">
            {displayed}
            {!isDone && <span className="typewriter-cursor" />}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center pt-2">
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl border border-border/70 text-sm transition-all
            hover:scale-105 hover:text-foreground hover:border-primary/50"
        >
          {copied ? (
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Copied
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Copy className="w-4 h-4" /> Copy
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="px-4 py-2 rounded-xl border border-border/70 text-sm transition-all
            hover:scale-105 hover:text-foreground hover:border-primary/50"
        >
          <span className="inline-flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </span>
        </button>
      </div>

      <div className="pt-4 border-t border-border/40 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Heart className="w-4 h-4 text-primary fill-primary animate-pulse-gentle" />
          <span>Save this or write it down to carry with you today.</span>
        </div>
      </div>
    </div>
  );
}
