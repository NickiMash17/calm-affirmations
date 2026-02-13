import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const loader = document.getElementById("app-loader");

createRoot(document.getElementById("root")!).render(<App />);

if (loader) {
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";
  window.setTimeout(() => loader.remove(), 300);
}
