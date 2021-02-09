import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./ducks/user/slice";
import { typeReducer } from "./ducks/type/slice";
import { brandReducer } from "./ducks/brand/slice";
import { deviceReducer } from "./ducks/device/slice";
import { pageReducer } from "./ducks/pages/slice";

export const rootReducer = combineReducers({
  user: userReducer,
  type: typeReducer,
  brand: brandReducer,
  device: deviceReducer,
  page: pageReducer
});

export type RootState = ReturnType<typeof rootReducer>;
