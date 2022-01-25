import React from "react";
import ReactDOM from "react-dom";
import { APIProvider } from "./Context/APIContext";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./Context/GlobalContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <APIProvider>
        <App />
      </APIProvider>
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
