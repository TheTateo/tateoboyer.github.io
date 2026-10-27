import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error CSS imports are handled by the bundler.
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Élément racine "root" introuvable dans le document.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
