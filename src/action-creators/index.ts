import ActionTypes from 'action-types';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { createAction } from 'redux-actions';

export const loadReportFromAssets = () =>
  createAPIAction({
    endpoint: `assets/report`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    // body: JSON.stringify(body),
    types: [ActionTypes.REQUEST_START, ActionTypes.REQUEST_SUCCESS, ActionTypes.REQUEST_FAILURE]
  });

export const newAction = createAction(ActionTypes.REQUEST);

export const increment = createAction(ActionTypes.INCREMENT);
export const decrement = createAction(ActionTypes.DECREMENT);
export const reset = createAction(ActionTypes.RESET);
