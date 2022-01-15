import React from "react";
import ReactDOM from "react-dom";
import { APIProvider } from "./APIContext";
// import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <APIProvider>
      <App />
    </APIProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
