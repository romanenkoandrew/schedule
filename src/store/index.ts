import rootReducer from 'reducers';
import { applyMiddleware, createStore, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';
import history from './history';

const initialState = {};

const enhancers = [];
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, apiMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer(history), initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
