import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

import App from "./App";

const store = createStore(counterReducer);
const root = createRoot(document.getElementById("root"));
root.render(<App storeToSubscribe={store} />);
store.subscribe(() => {
  root.render(<App storeToSubscribe={store} />);
});
