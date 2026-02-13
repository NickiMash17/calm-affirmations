import { useState, useCallback, useEffect, useRef } from "react";
import AppHeader from "@/components/AppHeader";
import AffirmationForm from "@/components/AffirmationForm.tsx";
import AffirmationResult from "@/components/AffirmationResult";
import AffirmationHistory from "@/components/AffirmationHistory";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingShimmer from "@/components/LoadingShimmer";
import { generateAffirmation } from "@/lib/api";
import { loadHistory, saveToHistory, clearHistory, HistoryEntry } from "@/lib/history";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmit, setLastSubmit] = useState<{ name: string; feeling: string } | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [elapsedMs, setElapsedMs] = useState(0);
  const loadingStartRef = useRef<number | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setElapsedMs(0);
      loadingStartRef.current = null;
      return;
    }

    loadingStartRef.current = Date.now();
    const id = window.setInterval(() => {
      if (!loadingStartRef.current) return;
      setElapsedMs(Date.now() - loadingStartRef.current);
    }, 300);

    return () => window.clearInterval(id);
  }, [isLoading]);

  const handleSubmit = useCallback(async (name: string, feeling: string) => {
    setIsLoading(true);
    setError(null);
    setAffirmation(null);
    setLastSubmit({ name, feeling });

    try {
      const result = await generateAffirmation({ name, feeling });
      setAffirmation(result.affirmation);
      const entry = saveToHistory({ name, feeling, affirmation: result.affirmation });
      setHistory((prev) => [entry, ...prev].slice(0, 20));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't generate your affirmation right now. Please try again shortly."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastSubmit) {
      handleSubmit(lastSubmit.name, lastSubmit.feeling);
    }
  }, [lastSubmit, handleSubmit]);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return (
    <div className="w-full">
      <AppHeader />

      <div className="glass-card rounded-2xl p-5 sm:p-8">
        <AffirmationForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {isLoading && <LoadingShimmer elapsedMs={elapsedMs} />}
      {affirmation && lastSubmit && (
        <AffirmationResult affirmation={affirmation} name={lastSubmit.name} />
      )}
      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      <AffirmationHistory entries={history} onClear={handleClearHistory} />
    </div>
  );
}
