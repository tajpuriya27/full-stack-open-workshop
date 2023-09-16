import React from "react";
import { createRoot } from "react-dom/client";
import { CounterContextProvider } from "./CounterContext";

import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <CounterContextProvider>
    <App />
  </CounterContextProvider>
);
