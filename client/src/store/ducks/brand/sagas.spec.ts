import { setPage } from "../pages/slice";
import { expectSaga } from "redux-saga-test-plan";
import { typeWorker } from "../type/sagas";
import { rootReducer, getInitialState, RootState } from "../../RootReducer";

const fakeInitialPage = 888;

it("saga type", async () => {
  const saga = expectSaga(typeWorker).withReducer(rootReducer, {
    ...getInitialState(),
    page: { ...getInitialState().page, page: fakeInitialPage },
  });

  const result = await saga.dispatch(setPage(1)).run();
  expect((result.storeState as RootState).page.page).toBe(1);
  expect((result.storeState as RootState).page.page).not.toBe(fakeInitialPage);
});
