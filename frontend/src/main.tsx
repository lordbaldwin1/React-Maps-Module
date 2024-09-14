/**
 * Entry point of the application.
 * Sets up React, Redux, and routing.
 * @module main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { rootStore } from "./store";
import { App } from "./App";
import "./styles/index.css";

/**
 * Renders the root component of the application.
 * Wraps the App component with necessary providers:
 * - Redux Provider for state management
 * - BrowserRouter for routing
 * - React.StrictMode for highlighting potential problems
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
