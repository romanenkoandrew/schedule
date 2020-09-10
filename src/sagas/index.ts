import { all } from 'redux-saga/effects';

import main from './pages/main';

export default function* rootSaga() {
  yield all([main()]);
}
