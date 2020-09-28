export const TYPE_COLORS: string = 'TYPE_COLORS';
export const TIME_ZONE: string = 'TIME_ZONE';
export const COURSES: string = 'COURSES';

export const COLUMN_OPTIONS: string = 'COLUMN_OPTIONS';
export const HIDE_ROWS = 'HIDE_ROWS';

export interface IColorType {
  background: string;
  textColor: string;
}
export interface IColorsOfTypes {
  deadline: IColorType;
  jsTask: IColorType;
  htmlTask: IColorType;
  selfEducation: IColorType;
  externalTask: IColorType;
  codeWars: IColorType;
  codeJam: IColorType;
  newTask: IColorType;
  lecture: IColorType;
  lectureOnline: IColorType;
  lectureOffline: IColorType;
  lectureMixed: IColorType;
  lectureSelfStudy: IColorType;
  test: IColorType;
  info: IColorType;
  warmup: IColorType;
  meetup: IColorType;
  workshop: IColorType;
  interview: IColorType;
}

export const COLORS_OF_TYPES: IColorsOfTypes = {
  deadline: {
    background: '#e40000',
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
};
