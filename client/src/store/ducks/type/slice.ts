import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITypeState, IType } from "./types";

export const initialState: ITypeState = {
  types: [],
  selected: null,
};

const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    addType(state, action: PayloadAction<IType>) {
      state.types.push(action.payload);
    },
    setTypes(state, action: PayloadAction<IType[]>) {
      state.types = action.payload;
    },
    removeType(state, action: PayloadAction<number>) {
      const id = action.payload;
      const index = state.types.findIndex((type) => type.id === id);
      if (index > -1) {
        state.types.splice(index, 1);
      }
    },
    updateType(state, action: PayloadAction<IType>) {
      const { id, name } = action.payload;
      const type = state.types.find((type) => type.id === id);
      if (type) {
        type.name = name;
      }
    },
    setSelectedType(state, action: PayloadAction<IType>) {
      const type = action.payload;
      console.log("select type");
      state.selected = type;
    },
    resetSelectedType(state, action: PayloadAction<void>) {
      state.selected = null;
    },
  },
});

export const {
  addType,
  removeType,
  updateType,
  setSelectedType,
  resetSelectedType,
  setTypes,
} = typeSlice.actions;

export const typeReducer = typeSlice.reducer;
