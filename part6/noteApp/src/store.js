import { configureStore } from "@reduxjs/toolkit";

import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    note: noteReducer,
    filter: filterReducer,
  },
});

export default store;
