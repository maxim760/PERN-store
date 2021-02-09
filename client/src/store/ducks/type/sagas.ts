import { put, takeLatest, call } from 'redux-saga/effects'
import { setPage } from '../pages/slice'
import { setSelectedType } from './slice'

export function* typeWatcher() {
  yield takeLatest(setSelectedType, typeWorker )
}

function* typeWorker() {
  console.log("type worker")
  yield put(setPage(1))
}