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
  courses: ['JS/Frontend 2020-Q3'],
  layout: Layouts.Table
};

interface IAction {
  type: string;
  payload: {};
}

const reducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.SWITCH_MENTOR_STUDENT: {
      let isStudent = get(action.payload, 'switchMentorStudent');
      isStudent = !isStudent;
      return { ...state, isStudent };
    }
    case ActionTypes.SWITCH_LAYOUT: {
      let layout = get(action.payload, 'switchLayout');
      return { ...state, layout };
    }
    case ActionTypes.CHANGE_TIMEZONE: {
      let timezone = get(action.payload, 'changeTimezone');
      return { ...state, timezone };
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
