import { useState, useCallback, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import AffirmationForm from "@/components/AffirmationForm";
import AffirmationResult from "@/components/AffirmationResult";
import AffirmationHistory from "@/components/AffirmationHistory";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingShimmer from "@/components/LoadingShimmer";
import BreathingWidget from "@/components/BreathingWidget";
import AppFooter from "@/components/AppFooter";
import ThemeToggle from "@/components/ThemeToggle";
import FloatingBlobs from "@/components/FloatingBlobs";
import { generateAffirmation } from "@/lib/api";
import { loadHistory, saveToHistory, clearHistory, HistoryEntry } from "@/lib/history";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmit, setLastSubmit] = useState<{ name: string; feeling: string } | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

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
    <div className="min-h-screen flex flex-col aurora-bg">
      <FloatingBlobs />
      <ThemeToggle />

      <main className="flex-1 flex flex-col items-center justify-start px-3 sm:px-4 relative z-10">
        <AppHeader />

        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl p-5 sm:p-8">
            <AffirmationForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {isLoading && (
            <>
              <LoadingShimmer />
              <BreathingWidget />
            </>
          )}
          {affirmation && lastSubmit && (
            <AffirmationResult affirmation={affirmation} name={lastSubmit.name} />
          )}
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          <AffirmationHistory entries={history} onClear={handleClearHistory} />
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;
