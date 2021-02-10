import {
  initialState,
  setIsAuth,
  userReducer,
  setNotIsAuth,
  setAuthStatusLoading,
  setAuthStatusError,
  setUser,
  setAuthError,
  fetchLoginUser,
  fetchRegisterUser,
  setAuthStatusNever,
  setAuthStatusSuccess,
} from "./slice";
import { ILoadingStatus } from "../types";
import { IAuthError, IUser } from "./types";
import { IUserForLogin, IUserForRegister } from "../../../services/api/userApi";

const fakeUser: IUser = {
  id: 1,
  email: "mail@a.ru",
  role: "ADMIN",
};

const fakeUserLogin: IUserForLogin = {
  email: "mail@a.ru",
  password: "qwerty",
};
const fakeUserReg: IUserForRegister = {
  email: "mail@a.ru",
  password: "qwerty",
  role: "ADMIN",
};

const fakeError: IAuthError = {
  message: "ошибка",
  status: 500,
};

const setAuthErrorWithParams = setAuthError.bind(null, fakeError);
describe("slice user test", () => {
  test("test setIsAuth", () => {
    expect(userReducer(initialState, setIsAuth)).toEqual({
      ...initialState,
      isAuth: true,
    });
  });
  test("test setNotIsAuth", () => {
    expect(
      userReducer({ ...initialState, isAuth: true }, setNotIsAuth)
    ).toEqual({
      ...initialState,
      isAuth: false,
    });
  });
  test("test setUser", () => {
    expect(
      userReducer(initialState, setUser(fakeUser))
    ).toEqual({
      ...initialState,
      user: fakeUser,
    });
  });
  test("test setAuthError", () => {
    expect(
      userReducer(initialState, setAuthError(fakeError))
    ).toEqual({
      ...initialState,
      authError: fakeError,
      authStatus: ILoadingStatus.ERROR,
    });
  });
  test("test fetchLoginUser", () => {
    expect(
      userReducer(initialState, fetchLoginUser)
    ).toEqual({
      ...initialState,
      authStatus: ILoadingStatus.LOADING,
    });
  });
  test("test fetchRegisterUser", () => {
    expect(
      userReducer(
        initialState,
        fetchRegisterUser
      )
    ).toEqual({
      ...initialState,
      authStatus: ILoadingStatus.LOADING,
      isAuth: false,
      user: null,
    });
  });
  test("test setAuthStatusError", () => {
    expect(userReducer({...initialState, isAuth: true, user: fakeUser}, setAuthStatusError)).toEqual({
      ...initialState,
      authStatus: ILoadingStatus.ERROR,
    });
  });
  test("test setAuthStatusNever", () => {
    expect(userReducer(initialState, setAuthStatusNever)).toEqual({
      ...initialState,
      authStatus: ILoadingStatus.NEVER,
    });
  });
  test("test setAuthStatusSuccess", () => {
    expect(userReducer(initialState, setAuthStatusSuccess)).toEqual({
      ...initialState,
      authStatus: ILoadingStatus.SUCCESS,
    });
  });
  test("test setAuthStatusLoading", () => {
    expect(userReducer(initialState, setAuthStatusLoading)).toEqual({
      ...initialState,
      authStatus: ILoadingStatus.LOADING,
    });
  });
});
