import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import { Provider } from "react-redux";
import App from "./App";

const store = createStore(noteReducer);

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
