import { useState } from "react";
import { Quote, Copy, Share2, Check } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { toast } from "@/hooks/use-toast";

interface Props {
  affirmation: string;
  name: string;
}

export default function AffirmationResult({ affirmation, name }: Props) {
  const { displayed, isDone } = useTypewriter(affirmation, 90);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affirmation);
      setCopied(true);
      toast({
        title: "Copied to clipboard ✨",
        description: "Your affirmation is ready to share.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Please try selecting the text manually.",
      });
    }
  };

  const handleShare = async () => {
    const shareText = `"${affirmation}" — crafted for ${name} 🌿`;
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        // User cancelled — that's okay
      }
    } else {
      // Fallback to copy
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied for sharing ✨",
        description: "Paste it wherever you'd like to share.",
      });
    }
  };

  return (
    <div className="animate-scale-in mt-6">
      <div className="glass-card rounded-2xl p-5 sm:p-8 space-y-4">
        <div className="flex items-start gap-3">
          <Quote className="w-5 h-5 text-primary/50 mt-0.5 shrink-0" strokeWidth={1.5} />
          <div className="space-y-3 min-h-[60px] flex-1">
            <p className="text-foreground text-base sm:text-lg leading-relaxed font-light">
              {displayed}
              {!isDone && <span className="typewriter-cursor" />}
            </p>
            {isDone && (
              <p className="text-[11px] text-muted-foreground/70 animate-fade-in tracking-wide uppercase">
                — crafted for {name}
              </p>
            )}
          </div>
        </div>

        {isDone && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/40 animate-fade-in">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 
                hover:text-primary transition-colors duration-300 px-2.5 py-1.5 rounded-lg
                hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Copy affirmation"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/70 
                hover:text-primary transition-colors duration-300 px-2.5 py-1.5 rounded-lg
                hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Share affirmation"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
