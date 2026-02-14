import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

async function clearStaleOfflineCache(): Promise<void> {
  if (typeof window === "undefined") return;

  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }

  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }
}

void clearStaleOfflineCache().finally(() => {
  const loader = document.getElementById("app-loader");
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);

  window.setTimeout(() => {
    if (!loader) return;
    loader.style.transition = "opacity 0.5s ease-out";
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    window.setTimeout(() => {
      if (loader.parentNode) {
        loader.remove();
      }
    }, 500);
  }, 900);
});
