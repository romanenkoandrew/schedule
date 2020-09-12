import ActionTypes from 'action-types';
import get from 'lodash/get';

interface IState {
  data: {};
}

export const initState: IState = {
  data: {}
};

interface IAction {
  type: string;
  payload: {};
}

const reducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.GET_DATA_SUCCESS:
      const data = get(action, 'payload', {});
      return { ...state, data };

    default: {
      return state;
    }
  }
};

export default reducer;
