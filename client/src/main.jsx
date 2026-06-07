import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import {
  EditorProvider
} from "./context/EditorContext";
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <EditorProvider>
      <App />
    </EditorProvider>
  </ErrorBoundary>
);