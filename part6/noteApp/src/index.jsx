import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { Provider } from "react-redux";
import App from "./App";

const reducer = combineReducers({
  note: noteReducer,
  filter: filterReducer,
});
const store = createStore(reducer);
console.log("printing the `state` from index.jsx", store.getState());

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

store.subscribe(() => console.log("logged from subsribe", store.getState()));
