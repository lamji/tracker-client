/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
  token: null,
  categoryFilter: "",
  filterType: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    ADD_DATA: (state, action) => {
      return {
        ...state,
        value: action.payload,
      };
    },
    ADD_TOKEN: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    SET_CATEGORY_FILTER: (state, action) => {
      return {
        ...state,
        categoryFilter: action.payload,
      };
    },
    SET_TYPE_FILTER: (state, action) => {
      return {
        ...state,
        filterType: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { ADD_DATA, ADD_TOKEN, SET_CATEGORY_FILTER, SET_TYPE_FILTER } =
  dataSlice.actions;

export default dataSlice.reducer;
