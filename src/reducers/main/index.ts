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

interface IAction {
  type: string;
  payload: {};
}

export const initState: IState = {
  score: 0,
  isStudent: true,
  timezone: 3,
  courses: ['JS/Frontend 2020-Q3'],
  layout: Layouts.Table,
  typeColors: {
    deadline: {
      background: 'red',
      textColor: 'white'
    },
    jsTask: {
      background: 'green',
      textColor: 'white'
    },
    htmlTask: {
      background: 'green',
      textColor: 'white'
    },
    selfEducation: {
      background: 'green',
      textColor: 'white'
    },
    externalTask: {
      background: 'green',
      textColor: 'white'
    },
    codeWars: {
      background: 'green',
      textColor: 'white'
    },
    codeJam: {
      background: 'green',
      textColor: 'white'
    },
    newTask: {
      background: 'green',
      textColor: 'white'
    },
    lecture: {
      background: 'blue',
      textColor: 'white'
    },
    lectureOnline: {
      background: 'blue',
      textColor: 'white'
    },
    lectureOffline: {
      background: 'blue',
      textColor: 'white'
    },
    lectureMixed: {
      background: 'blue',
      textColor: 'white'
    },
    lectureSelfStudy: {
      background: 'blue',
      textColor: 'white'
    },
    test: {
      background: '#63ab91',
      textColor: 'white'
    },
    info: {
      background: '#ff7b00',
      textColor: 'white'
    },
    warmup: {
      background: '#63ab91',
      textColor: 'white'
    },
    meetup: {
      background: '#bde04a',
      textColor: 'white'
    },
    workshop: {
      background: '#bde04a',
      textColor: 'white'
    },
    interview: {
      background: '#63ab91',
      textColor: 'white'
    }
  }
};

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
    case ActionTypes.CHANGE_TYPE_COLORS: {
      let typeColors = action.payload;
      return { ...state, typeColors };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
