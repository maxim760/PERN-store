import { put, takeLatest, call } from "redux-saga/effects";
import { setPage } from "../pages/slice";
import { setSelectedBrand } from "./slice";
  
export function* brandWatcher() {
  yield takeLatest(setSelectedBrand, brandWorker);
}

function* brandWorker() {
  yield put(setPage(1));
}
