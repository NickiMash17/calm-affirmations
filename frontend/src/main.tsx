import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

// Lazy load App component for better initial loading performance
const App = lazy(() => import("./App"));

// Create root and render with Suspense for lazy loading
const root = createRoot(document.getElementById("root")!);

root.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      const onUpdateFound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            if (window.confirm('A new version is available. Reload now?')) {
              window.location.reload();
            }
          }
        };
      };

      registration.addEventListener('updatefound', onUpdateFound);
    });
  });
}
