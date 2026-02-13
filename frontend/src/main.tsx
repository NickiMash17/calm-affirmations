import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";

// Lazy load App component for better initial loading performance
const App = lazy(() => import("./App"));

const loader = document.getElementById("app-loader");

// Create root and render with Suspense for lazy loading
const root = createRoot(document.getElementById("root")!);

root.render(
  <Suspense 
    fallback={
      // Keep showing loader while lazy component loads
      <div style={{ display: 'none' }} />
    }
  >
    <App />
  </Suspense>
);

// Hide loader when the lazy component has loaded
// The lazy import promise resolves when the component is ready
import("./App").then(() => {
  // Add extra delay so users can see the calming loader
  setTimeout(() => {
    if (loader) {
      // Add smooth transition
      loader.style.transition = "opacity 0.5s ease-out";
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      
      // Remove loader after transition
      window.setTimeout(() => {
        if (loader.parentNode) {
          loader.remove();
        }
      }, 500);
    }
  }, 1500); // Show loader for at least 1.5 seconds
});
