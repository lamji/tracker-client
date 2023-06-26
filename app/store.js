/** @format */

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import dataReducer from "./features/data/dataSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
  },
});
