import { call, put, take } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { userLoginWorker, userRegisterWorker } from "./sagas";
import { rootReducer, getInitialState, RootState } from "../../RootReducer";
import { UserApi } from "../../../services/api/userApi";
import {
  fetchRegisterUser,
  setAuthStatusError,
  setAuthStatusSuccess,
  setUser,
  setIsAuth,
  fetchLoginUser,
  setAuthError,
} from "./slice";
import { ILoadingStatus } from "../types";
import { TEST_DATA_FROM_TOKEN, TEST_TOKEN } from "../../../forTest/consts";
// https://www.jsonwebtoken.io
const fakeSuccessData = {
  status: "success",
  token: TEST_TOKEN,
};
const fakeErrorData = {
  status: "error",
  error: {
    status: 404,
    message: "error",
  },
};
const fakeUserData = TEST_DATA_FROM_TOKEN
const fakePayload = { email: "22", password: "22" };

describe("saga user", () => {
  describe("saga login", () => {
    it("success login", async () => {
      const saga = expectSaga(userLoginWorker, {
        payload: fakePayload,
        type: fetchLoginUser.type,
      })
        .provide([[call(UserApi.login, fakePayload), fakeSuccessData]])
        .withReducer(rootReducer, getInitialState());

      const result = await saga
        .dispatch(setAuthStatusSuccess())
        .dispatch(setUser(fakeUserData))
        .dispatch(setIsAuth())
        .run();
      console.log(result.storeState);
      expect((result.storeState as RootState).user.isAuth).toBeTruthy();
      expect((result.storeState as RootState).user.user?.email).toEqual(
        fakeUserData.email
      );
      expect((result.storeState as RootState).user.user?.id).toEqual(
        fakeUserData.id
      );
      expect((result.storeState as RootState).user.user?.role).toEqual(
        fakeUserData.role
      );
      expect((result.storeState as RootState).user.authStatus).toBe(
        ILoadingStatus.SUCCESS
      );
    });
    it("error login", async () => {
      const saga = expectSaga(userLoginWorker, {
        payload: fakePayload,
        type: fetchLoginUser.type,
      })
        .provide([[call(UserApi.login, fakePayload), fakeErrorData]])
        .withReducer(rootReducer, {
          ...getInitialState(),
          user: {
            ...getInitialState().user,
            isAuth: true,
            authStatus: ILoadingStatus.SUCCESS,
            user: fakeUserData,
          },
        });

      const result = await saga
        .dispatch(setAuthStatusError())
        .dispatch(setAuthError(fakeErrorData.error))
        .run();
      expect((result.storeState as RootState).user.isAuth).toBeFalsy();
      expect((result.storeState as RootState).user.user).toBeFalsy();
      expect((result.storeState as RootState).user.authStatus).toBe(
        ILoadingStatus.ERROR
      );
      expect((result.storeState as RootState).user.authError).toEqual(
        fakeErrorData.error
      );
    });
  });
  describe("saga register", () => {
    it("success register", async () => {
      const saga = expectSaga(userRegisterWorker, {
        payload: fakePayload,
        type: fetchRegisterUser.type,
      })
        .provide([[call(UserApi.registration, fakePayload), fakeSuccessData]])
        .withReducer(rootReducer, getInitialState());

      const result = await saga.dispatch(setAuthStatusSuccess()).run();
      expect((result.storeState as RootState).user.authStatus).toBe(
        ILoadingStatus.SUCCESS
      );
    });
    it("error registration", async () => {
      const saga = expectSaga(userRegisterWorker, {
        payload: fakePayload,
        type: fetchRegisterUser.type,
      })
        .provide([[call(UserApi.registration, fakePayload), fakeErrorData]])
        .withReducer(rootReducer, {
          ...getInitialState(),
          user: {
            ...getInitialState().user,
            authStatus: ILoadingStatus.SUCCESS,
          },
        });

      const result = await saga
        .dispatch(setAuthStatusError())
        .dispatch(setAuthError(fakeErrorData.error))
        .run();
      expect((result.storeState as RootState).user.isAuth).toBeFalsy();
      expect((result.storeState as RootState).user.user).toBeFalsy();
      expect((result.storeState as RootState).user.authStatus).toBe(
        ILoadingStatus.ERROR
      );
      expect((result.storeState as RootState).user.authError).toEqual(
        fakeErrorData.error
      );
    });
  });
});
