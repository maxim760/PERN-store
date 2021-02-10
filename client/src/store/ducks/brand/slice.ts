import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBrandState, IBrand } from "./types";

const initialState: IBrandState = {
  brands: [],
  selected: null,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    addBrand(state, action: PayloadAction<IBrand>) {
      state.brands.push(action.payload);
    },
    setBrands(state, action: PayloadAction<IBrand[]>) {
      state.brands = action.payload;
    },
    removeBrand(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.brands.findIndex((brand) => brand.id === id);
      if (index > -1) {
        state.brands.splice(index, 1);
      }
    },
    updateBrand(state, action: PayloadAction<IBrand>) {
      const { id, name } = action.payload;
      const brand = state.brands.find((brand) => brand.id === id);
      if (brand) {
        brand.name = name;
      }
    },
    setSelectedBrand(state, action: PayloadAction<IBrand>) {
      const brand = action.payload;
      state.selected = brand;
    },
    resetSelectedBrand(state, action: PayloadAction<void>) {
      state.selected = null;
    },
  },
});

export const {
  addBrand,
  removeBrand,
  updateBrand,
  setSelectedBrand,
  resetSelectedBrand,
  setBrands,
} = brandSlice.actions;

export const brandReducer = brandSlice.reducer;
