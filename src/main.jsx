import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { applyTheme, getTheme } from "./shared/ui/theme.js";
import "./index.css";

applyTheme(getTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
