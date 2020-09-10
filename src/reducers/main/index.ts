import ActionTypes from 'action-types';
import get from 'lodash/get';

interface IState {
  score: number;
}

export const initState: IState = {
  score: 0
};

const reducer = (state = initState, action: { type: string; payload: { data: {} } }) => {
  switch (action.type) {
    case ActionTypes.REQUEST_SUCCESS:
      return { ...initState, ...state, ...action.payload.data };

    case ActionTypes.INCREMENT: {
      let score = get(action.payload, 'increment');
      console.log(action);
      console.log('score:', score);
      score += 1;
      return { ...state, score };
    }
    case ActionTypes.DECREMENT: {
      let score = get(action.payload, 'decrement');
      score -= 1;
      return { ...state, score };
    }
    case ActionTypes.RESET: {
      let score = get(action.payload, 'reset');
      score = 0;
      return { ...state, score };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
