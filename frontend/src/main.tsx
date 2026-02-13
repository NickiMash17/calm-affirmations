import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

// Register service worker for offline caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Lazy load App component for better initial loading performance
const App = lazy(() => import("./App"));

// Create root and render with Suspense for lazy loading
const root = createRoot(document.getElementById("root")!);

root.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);
