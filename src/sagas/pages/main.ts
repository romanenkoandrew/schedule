import { takeEvery, all, put } from 'redux-saga/effects';
import ActionTypes from 'action-types';
import { loadReportFromAssets } from 'action-creators';
import { any } from 'ramda';

export function* handleLogInSuccessWorker(): IterableIterator<{}> {
  //   const response = yield fetch(url, {
  //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //   mode: 'cors', // no-cors, *cors, same-origin
  //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //   credentials: 'same-origin', // include, *same-origin, omit
  //   headers: {
  //     'Content-Type': 'application/json'
  //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  //   redirect: 'follow', // manual, *follow, error
  //   referrerPolicy: 'no-referrer', // no-referrer, *client
  //   body: JSON.stringify(data) // body data type must match "Content-Type" header
  // });
  // yield put(setResponseToState(response))
  //  yield put(loadReportFromAssets())
}

export function* handleLogInSuccessWatcher() {
  yield takeEvery(ActionTypes.REQUEST, handleLogInSuccessWorker);
}

export default function* mainSaga() {
  yield all([handleLogInSuccessWatcher()]);
}
