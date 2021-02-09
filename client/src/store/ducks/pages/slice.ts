import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPageState } from "./types";

const initialState: IPageState = {
  page: 1,
  totalCount: 0,
  limit: 3,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    
  },
});

export const {
  setLimit,
  setPage,
  setTotalCount
} = pageSlice.actions;

export const pageReducer = pageSlice.reducer;
