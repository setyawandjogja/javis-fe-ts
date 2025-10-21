import { createRoot } from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
