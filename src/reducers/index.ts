import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import main from './main';
import data from './data';

export default (history: History) =>
  combineReducers({
    main,
    data,

    router: connectRouter(history)
  });
