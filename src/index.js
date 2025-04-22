import React from "react";
import { createRoot } from "react-dom";
import "./index.css";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";

// Disable lazy loading for all images in the application
const imgElements = document.querySelectorAll("img");
imgElements.forEach((img) => img.setAttribute("loading", "eager"));

// Use createRoot to render your application
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
