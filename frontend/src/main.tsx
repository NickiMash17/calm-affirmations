import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const loader = document.getElementById("app-loader");

// Create root and render app immediately
const root = createRoot(document.getElementById("root")!);

root.render(<App />);

// Hide loader with smooth transition after a short delay
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
