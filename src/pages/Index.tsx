import { useState, useCallback } from "react";
import AppHeader from "@/components/AppHeader";
import AffirmationForm from "@/components/AffirmationForm";
import AffirmationResult from "@/components/AffirmationResult";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingShimmer from "@/components/LoadingShimmer";
import AppFooter from "@/components/AppFooter";
import ThemeToggle from "@/components/ThemeToggle";
import { generateAffirmation } from "@/lib/api";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmit, setLastSubmit] = useState<{ name: string; feeling: string } | null>(null);

  const handleSubmit = useCallback(async (name: string, feeling: string) => {
    setIsLoading(true);
    setError(null);
    setAffirmation(null);
    setLastSubmit({ name, feeling });

    try {
      const result = await generateAffirmation({ name, feeling });
      setAffirmation(result.affirmation);
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

  return (
    <div className="min-h-screen flex flex-col bg-background bg-calm-pattern">
      <ThemeToggle />
      <main className="flex-1 flex flex-col items-center justify-start px-4">
        <AppHeader />

        <div className="w-full max-w-md">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 sm:p-8">
            <AffirmationForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {isLoading && <LoadingShimmer />}
          {affirmation && lastSubmit && (
            <AffirmationResult affirmation={affirmation} name={lastSubmit.name} />
          )}
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;
