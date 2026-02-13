import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="animate-scale-in mt-6" role="alert">
      <div className="glass-card rounded-3xl p-5 sm:p-6 md:p-7 space-y-3 sm:space-y-4 text-center border border-destructive/20">
        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" strokeWidth={1.5} />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="text-sm sm:text-base font-semibold">Something went wrong</h3>
          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">{message}</p>
        </div>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-primary hover:text-primary/80
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg
            transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
        >
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
