import ActionTypes from 'action-types';
import get from 'lodash/get';

interface IState {
  score: number;
}

export const initState: IState = {
  score: 0
};

interface IAction {
  type: string;
  payload: {};
}

const reducer = (state = initState, action: IAction) => {
  switch (action.type) {
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
