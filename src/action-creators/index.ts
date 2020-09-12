import ActionTypes from 'action-types';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { createAction } from 'redux-actions';

export const getDataRequest = () =>
  createAPIAction({
    method: 'GET',
    endpoint: `https://jsonplaceholder.typicode.com/todos/1`,
    // headers: {
    //   'Content-Type': 'application/json;charset=utf-8'
    // },
    // body: JSON.stringify(body),
    types: [ActionTypes.GET_DATA_REQUEST, ActionTypes.GET_DATA_SUCCESS, ActionTypes.GET_DATA_FAILURE]
  });

export const getData = createAction(ActionTypes.GET_DATA);

export const increment = createAction(ActionTypes.INCREMENT);
export const decrement = createAction(ActionTypes.DECREMENT);
export const reset = createAction(ActionTypes.RESET);
