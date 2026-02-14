import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const BOOT_FLAG = "__CALM_APP_BOOTED__";
const loader = document.getElementById("app-loader");

createRoot(document.getElementById("root")!).render(<App />);

window[BOOT_FLAG as keyof Window & string] = true;

if (loader) {
  window.setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    loader.style.transition = "opacity 0.35s ease-out";

    window.setTimeout(() => {
      loader.remove();
    }, 360);
  }, 900);
}
