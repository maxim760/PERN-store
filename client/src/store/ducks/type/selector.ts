import { RootState } from "../../RootReducer";

export const selectTypes = (state: RootState) => state.type.types
export const selectTypeSelected = (state: RootState) => state.type.selected