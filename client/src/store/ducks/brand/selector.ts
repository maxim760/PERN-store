import { RootState } from "../../RootReducer";

export const selectBrands = (state: RootState) => state.brand.brands
export const selectBrandSelected = (state: RootState) => state.brand.selected