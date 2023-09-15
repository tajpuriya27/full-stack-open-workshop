import React from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { Provider } from "react-redux";
import App from "./App";

const reducer = {
  note: noteReducer,
  filter: filterReducer,
};
console.log(reducer);
const store = configureStore({ reducer });
console.log("printing the `state` from index.jsx", store.getState());

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// store.subscribe(() => console.log("logged from subsribe", store.getState()));
