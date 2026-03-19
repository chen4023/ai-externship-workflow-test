import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./shared/styles/global.css";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { startWorker } = await import("./mocks/browser");
    return startWorker();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
