import { call, put, take } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { typeWorker } from "./sagas";
import { rootReducer, getInitialState, RootState } from "../../RootReducer";
import { UserApi } from "../../../services/api/userApi";
import { setPage } from "../pages/slice";

const fakeInitialPage = 888

it("saga type", async () => {
  const saga = expectSaga(typeWorker).withReducer(rootReducer, {
    ...getInitialState(),
    page: { ...getInitialState().page, page: fakeInitialPage },
  });
  
  const result = await saga
    .dispatch(setPage(1))
    .run();
  expect((result.storeState as RootState).page.page).toBe(1);
  expect((result.storeState as RootState).page.page).not.toBe(fakeInitialPage);
});
