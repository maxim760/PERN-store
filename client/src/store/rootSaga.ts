import { all } from "redux-saga/effects";
import { userWatcher } from "./ducks/user/sagas";
import { brandWatcher } from "./ducks/brand/sagas";
import { typeWatcher } from "./ducks/type/sagas";

export function* rootSaga() {
  yield all([userWatcher(), brandWatcher(), typeWatcher()]);
}
