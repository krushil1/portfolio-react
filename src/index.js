// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


import React from "react";
import { createRoot } from "react-dom";
import "./index.css";
import App from "./App";

// Disable lazy loading for all images in the application
const imgElements = document.querySelectorAll('img');
imgElements.forEach((img) => img.setAttribute('loading', 'eager'));

// Use createRoot to render your application
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
