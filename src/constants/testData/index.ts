const testData = {
  id: 'KyvcYfdhjMuXQeK4eoYc',
  name: 'HTML',
  description: 'Студент знакомится с HTML',
  descriptionUrl: 'https://guides.hexlet.io/markdown/',
  type: ['htmlTask', 'info'],
  timeZone: 3,
  dateTime: 1600291763391,
  place: 'class',
  comment: 'Создан и размещён на gh-pages файл HTML',
  trainee: 'Сергей Шаляпин',
  courseName: 'jsFrontEnd',
  timeToImplementation: 4,
  broadcastUrl: 'Link on Video',
  materialsLinks: ['link1', 'link2'],
  block: 'HTML',
  result: 'Студент знает HTML',
  stack: ['HTML', 'CSS', 'Markdown'],
  feedBack: 'Cool',
  taskBreakpoints: [1600291763391, 1600516923391],
  videoLink: 'string'
};
const emptyData = {
  id: '',
  name: '',
  description: '',
  descriptionUrl: '',
  type: [],
  timeZone: 3,
  dateTime: 1600291763391,
  place: '',
  comment: '',
  trainee: '',
  courseName: '',
  timeToImplementation: 4,
  broadcastUrl: '',
  materialsLinks: [],
  block: '',
  result: '',
  stack: [],
  feedBack: '',
  taskBreakpoints: [1600291763391, 1600291764391],
  videoLink: ''
};
export { testData, emptyData };
// export interface IEvent {
//   id: string;
//   name: string;
//   description: string;
//   descriptionUrl: string;
//   type: string[];
//   timeZone: number;
//   dateTime: number;
//   place: string;
//   comment: string;
//   trainee: string;
//   courseName: string;
//   timeToImplementation: number;
//   broadcastUrl: string;
//   materialsLinks: string[];
//   block: string;
//   result: string;
//   stack: string[];
//   feedBack: string;
//   taskBreakpoints: number[];
//   videoLink: string;
//   [propName: string]: any;
// }
