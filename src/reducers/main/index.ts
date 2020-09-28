import ActionTypes from 'action-types';
import get from 'lodash/get';

import { Layouts } from 'constants/header/header';
import { TYPE_COLORS, COURSES, TIME_ZONE, COLORS_OF_TYPES } from 'constants/globalConstants';
import { getFromLocalStorage } from 'utils/utils';
import { Courses } from 'constants/header/header';

interface IState {
  score: number;
  isStudent: boolean;
  timezone: number;
  courses: string[];
  layout: number;
  typeColors: {};
}

interface IAction {
  type: string;
  payload: {};
}

export const initState: IState = {
  score: 0,
  isStudent: true,
  timezone: getFromLocalStorage(TIME_ZONE, 3),
  courses: getFromLocalStorage(COURSES, Courses),
  layout: Layouts.Table,
  typeColors: getFromLocalStorage(TYPE_COLORS, COLORS_OF_TYPES)
};

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
      localStorage.setItem(TIME_ZONE, JSON.stringify(timezone));
      return { ...state, timezone };
    }
    case ActionTypes.CHANGE_COURSE: {
      let courses = get(action.payload, 'changeCourse');
      localStorage.setItem(COURSES, JSON.stringify(courses));
      return { ...state, courses };
    }
    case ActionTypes.CHANGE_TYPE_COLORS: {
      let typeColors = action.payload;
      localStorage.setItem(TYPE_COLORS, JSON.stringify(typeColors));
      return { ...state, typeColors };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
