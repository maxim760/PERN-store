import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserState, IUser, IAuthError } from "./types";
import {
  IUserForLogin,
  IUserForRegister,
  IError,
} from "../../../services/api/userApi";
import { ILoadingStatus } from "../types";

const initialState: IUserState = {
  isAuth: false,
  user: null,
  authStatus: ILoadingStatus.NEVER,
  authError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<void>) {
      state.isAuth = true;
    },
    setNotIsAuth(state, action: PayloadAction<void>) {
      state.isAuth = false;
      state.user = null // если не авторизован то информации об юзере не дожлно быть
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setAuthError(state, action: PayloadAction<IAuthError>) {
      state.authError = action.payload;
      state.authStatus = ILoadingStatus.ERROR
    },
    fetchLoginUser(state, action: PayloadAction<IUserForLogin>) {
      state.authStatus = ILoadingStatus.LOADING;
    },
    fetchRegisterUser(state, action: PayloadAction<IUserForRegister>) {
      state.authStatus = ILoadingStatus.LOADING;
    },
    setAuthStatusError(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.ERROR;
    },
    setAuthStatusNever(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.NEVER;
    },
    setAuthStatusSuccess(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.SUCCESS;
    },
    setAuthStatusLoading(state, action: PayloadAction<void>) {
      state.authStatus = ILoadingStatus.LOADING;
    },
  },
});

export const {
  setIsAuth,
  setNotIsAuth,
  setUser,
  setAuthError,
  fetchLoginUser,
  fetchRegisterUser,
  setAuthStatusError,
  setAuthStatusNever,
  setAuthStatusSuccess,
  setAuthStatusLoading
} = userSlice.actions;

export const userReducer = userSlice.reducer;
