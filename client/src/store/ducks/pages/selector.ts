import { RootState } from "../../RootReducer";

export const selectPage = (state: RootState) => state.page.page
export const selectTotalCount = (state: RootState) => state.page.totalCount
export const selectLimit = (state: RootState) => state.page.limit