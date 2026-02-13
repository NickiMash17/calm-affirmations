import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const loader = document.getElementById("app-loader");
const bootFlag = "__CALM_APP_BOOTED__";

createRoot(document.getElementById("root")!).render(<App />);

window[bootFlag as keyof Window & string] = true;

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
