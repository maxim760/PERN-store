import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./ducks/user/slice";
import { typeReducer } from "./ducks/type/slice";
import { brandReducer } from "./ducks/brand/slice";
import { deviceReducer } from "./ducks/device/slice";
import { pageReducer } from "./ducks/pages/slice";
import { ILoadingStatus } from "./ducks/types";

export const rootReducer = combineReducers({
  user: userReducer,
  type: typeReducer,
  brand: brandReducer,
  device: deviceReducer,
  page: pageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getInitialState = () => ({
  user: {
    isAuth: false,
    user: null,
    authStatus: ILoadingStatus.NEVER,
    authError: null,
  },
  type: {
    types: [],
    selected: null,
  },
  brand: {
    brands: [],
    selected: null,
  },
  device: {
    devices: null,
    selected: null,
  },
  page: {
    page: 1,
    totalCount: 0,
    limit: 3,
  },
});
