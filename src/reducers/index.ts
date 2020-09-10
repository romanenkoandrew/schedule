import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import main from './main';

export default (history: History) =>
  combineReducers({
    main,

    router: connectRouter(history)
  });
