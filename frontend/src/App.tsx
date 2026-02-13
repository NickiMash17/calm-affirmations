import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppShell from "@/pages/AppShell";
import NotFound from "@/pages/NotFound";

// Lazy load pages for better performance
const HomePage = lazy(() => import("@/pages/Home"));
const JournalPage = lazy(() => import("@/pages/Journal"));
const ResourcesPage = lazy(() => import("@/pages/Resources"));

// Create loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse-gentle text-muted-foreground">Loading...</div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route 
              path="/" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <HomePage />
                </Suspense>
              } 
            />
            <Route 
              path="/journal" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <JournalPage />
                </Suspense>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <ResourcesPage />
                </Suspense>
              } 
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
