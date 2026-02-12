import { CloudOff } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="animate-fade-in-up mt-6" role="alert">
      <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-3 text-center">
        <CloudOff className="w-5 h-5 text-warning/80 mx-auto" strokeWidth={1.5} />
        <p className="text-foreground/80 text-sm leading-relaxed">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="text-sm text-primary hover:text-primary/80 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg
            transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
