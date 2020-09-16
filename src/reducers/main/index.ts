import ActionTypes from 'action-types';
import get from 'lodash/get';

import { Layouts } from 'constants/header/header';

interface IState {
  score: number;
  isStudent: boolean;
  timezone: number;
  courses: string[];
  layout: number;  
}

export const initState: IState = {
  score: 0,
  isStudent: true,
  timezone: 3,
  courses: ["JS/Frontend 2020-Q3"],
  layout: Layouts.Table 
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
    case ActionTypes.SWITCH_MENTOR_STUDENT: {
      let isStudent = get(action.payload, 'switchMentorStudent');
      isStudent = !isStudent;
      return { ...state, isStudent };
    }
    case ActionTypes.SWITCH_LAYOUT: {
      let currentLayout = get(action.payload, 'switchLayout');
      return { ...state, currentLayout };
    }
    case ActionTypes.CHANGE_TIMEZONE: {
      let currentTimezone = get(action.payload, 'changeTimezone');
      return { ...state, currentTimezone };
    }
    case ActionTypes.CHANGE_COURSE: {
      let courses = get(action.payload, 'changeCourse');
      return { ...state, courses };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
