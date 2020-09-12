import { takeEvery, all, put } from 'redux-saga/effects';
import ActionTypes from 'action-types';
import { getDataRequest } from 'action-creators';

export function* getDataWorker(): IterableIterator<{}> {
  yield put(getDataRequest() as any);
}

export function* getDataWatcher() {
  yield takeEvery(ActionTypes.GET_DATA, getDataWorker);
}

export default function* mainSaga() {
  yield all([getDataWatcher()]);
}
