import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const loader = document.getElementById("app-loader");

createRoot(document.getElementById("root")!).render(<App />);

if (loader) {
  window.setTimeout(() => {
    loader.style.transition = "opacity 0.35s ease-out";
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    window.setTimeout(() => {
      loader.remove();
    }, 350);
  }, 450);
}
