import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom/client"; // Correct import
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
