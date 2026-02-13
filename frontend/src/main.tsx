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

const loader = document.getElementById("app-loader");

// Create root and render with Suspense for lazy loading
const root = createRoot(document.getElementById("root")!);

root.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);

// Hide loader with smooth transition
if (loader) {
  // Add a small delay to ensure smooth transition
  requestAnimationFrame(() => {
    loader.style.transition = "opacity 0.5s ease-out";
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    
    // Remove loader after transition
    window.setTimeout(() => {
      if (loader.parentNode) {
        loader.remove();
      }
    }, 500);
  });
}
