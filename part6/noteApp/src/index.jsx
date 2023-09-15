import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// console.log("printing the `state` from index.jsx", store.getState());

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// store.subscribe(() => console.log("logged from subsribe", store.getState()));
