import ActionTypes from 'action-types';
import get from 'lodash/get';

import { Layouts } from 'constants/header/header';

interface IState {
  score: number;
  isStudent: boolean;
  timezone: number;
  courses: string[];
  layout: number;
  typeColors: {};
}

export const initState: IState = {
  score: 0,
  isStudent: true,
  timezone: 3,
  courses: ['JS/Frontend 2020-Q3'],
  layout: Layouts.Table,
  typeColors: {
    deadline: 'red',
    jsTask: 'green',
    htmlTask: 'green',
    selfEducation: 'green',
    externalTask: 'green',
    codeWars: 'green',
    codeJam: 'green',
    newTask: 'green',
    lecture: 'blue',
    lectureOnline: 'blue',
    lectureOffline: 'blue',
    lectureMixed: 'blue',
    lectureSelfStudy: 'blue',
    test: '#63ab91',
    info: '#ff7b00',
    warmup: '#63ab91',
    meetup: '#bde04a',
    workshop: '#bde04a',
    interview: '#63ab91'
  }
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
    case ActionTypes.CHANGE_TYPE_COLOR: {
      console.log(action.payload);
      // let typeColors = get(action.payload, 'changeTypeColors');
      // console.log(typeColors)
      let typeColors = action.payload;
      return { ...state, typeColors };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
