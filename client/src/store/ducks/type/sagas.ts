import { put, takeLatest, call } from 'redux-saga/effects'
import { setPage } from '../pages/slice'
import { setSelectedType } from './slice'

export function* typeWatcher() {
  yield takeLatest(setSelectedType, typeWorker )
}

export function* typeWorker() {
  yield put(setPage(1))
}