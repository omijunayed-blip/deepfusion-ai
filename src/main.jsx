import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  // If index.html doesn't yet have #root, show simple message
  document.body.innerHTML = "<div style='padding:20px;color:#fff;background:#071029;font-family:system-ui;'>DeepFusion: Please ensure this app is served with an index.html that has a <div id=\"root\"></div>.</div>";
}
