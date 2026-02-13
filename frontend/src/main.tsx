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
