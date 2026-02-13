import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="animate-scale-in mt-6" role="alert">
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-4 text-center border border-destructive/20">
        <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-6 h-6 text-destructive" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Something went wrong</h3>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg
            transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
