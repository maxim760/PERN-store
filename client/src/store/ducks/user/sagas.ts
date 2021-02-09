import { put, takeLatest, call } from "redux-saga/effects";
import {
  setIsAuth,
  fetchLoginUser,
  fetchRegisterUser,
  setAuthStatusSuccess,
  setAuthStatusError,
  setAuthError,
  setUser,
} from "./slice";
import {
  IUserForRegister,
  IUserForLogin,
  UserApi,
  IResultError,
  IResult,
} from "../../../services/api/userApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./types";
import { getDataFromJwt } from "../../../utils/getDataFromJwt";

export function* userWatcher() {
  yield takeLatest(fetchLoginUser, userLoginWorker);
  yield takeLatest(fetchRegisterUser, userRegisterWorker);
}

function* userLoginWorker({ payload }: PayloadAction<IUserForLogin>) {
  const data: IResultError | IResult = yield call(UserApi.login, payload);
  if (data.status === "error") {
    yield put(setAuthStatusError());
    yield put(setAuthError(data.error));
  } else {
    const userData = getDataFromJwt<IUser>(data.token);
    window.localStorage.setItem("token", data.token)
    yield put(setAuthStatusSuccess());
    yield put(setUser(userData));
    yield put(setIsAuth())
  }
}
function* userRegisterWorker({ payload }: PayloadAction<IUserForRegister>) {
  const data: IResultError | IResult = yield call(
    UserApi.registration,
    payload
  );
  if (data.status === "error") {
    yield put(setAuthStatusError());
    yield put(setAuthError(data.error));
  } else {
    yield put(setAuthStatusSuccess());
  }
}
