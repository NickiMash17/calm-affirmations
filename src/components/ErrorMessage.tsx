import { CloudOff } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="animate-fade-in mt-6" role="alert">
      <div className="rounded-lg border border-warning/30 bg-warning/5 p-5 sm:p-6 space-y-3 text-center">
        <CloudOff className="w-5 h-5 text-warning mx-auto" strokeWidth={1.5} />
        <p className="text-foreground text-sm leading-relaxed">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="text-sm text-primary underline underline-offset-2 hover:text-primary/80 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
