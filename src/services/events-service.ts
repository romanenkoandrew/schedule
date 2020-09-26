import {
  getDataRequest,
  postDataRequest,
  putDataRequest,
  deleteDataByIdRequest,
  getDataByIdRequest
} from '../action-creators';
import ActionTypes from 'action-types';

export interface IEvent {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string[];
  timeZone: number;
  dateTime: [number, string];
  place: string;
  comment: string;
  trainee: string;
  courseName: string;
  timeToImplementation: number;
  broadcastUrl: string;
  materialsLinks: string[];
  block: string;
  result: string;
  stack: string[];
  deadline: [number, string];
  videoLink: string;
  feedback: string[];
  [propName: string]: any;
}
export default class EventsService {
  getEvents = () => {
    const url = `/events`;
    const types = [
      ActionTypes.GET_EVENTS_DATA_REQUEST,
      ActionTypes.GET_EVENTS_DATA_SUCCESS,
      ActionTypes.GET_EVENTS_DATA_FAILURE
    ];
    return getDataRequest(url, types);
  };

  addNewEvent = (eventData: IEvent) => {
    const url = `/event`;
    const types = [
      ActionTypes.POST_EVENT_DATA_REQUEST,
      ActionTypes.POST_EVENT_DATA_SUCCESS,
      ActionTypes.POST_EVENT_DATA_FAILURE
    ];
    return postDataRequest(url, eventData, types);
  };

  getEventById = (id: string) => {
    const url = `/event/${id}`;
    const types = [
      ActionTypes.GET_EVENT_DATA_BY_ID_REQUEST,
      ActionTypes.GET_EVENT_DATA_BY_ID_SUCCESS,
      ActionTypes.GET_EVENT_DATA_BY_ID_FAILURE
    ];
    return getDataByIdRequest(url, types);
  };

  updateEvent = (eventData: IEvent) => {
    const id = eventData.id;
    const url = `/event/${id}`;
    const types = [
      ActionTypes.PUT_EVENT_DATA_REQUEST,
      ActionTypes.PUT_EVENT_DATA_SUCCESS,
      ActionTypes.PUT_EVENT_DATA_FAILURE
    ];
    return putDataRequest(url, eventData, types);
  };

  deleteEvent = (id: string) => {
    const url = `/event/${id}`;
    const types = [
      ActionTypes.DELETE_EVENT_DATA_BY_ID_REQUEST,
      ActionTypes.DELETE_EVENT_DATA_BY_ID_SUCCESS,
      ActionTypes.DELETE_EVENT_DATA_BY_ID_FAILURE
    ];
    return deleteDataByIdRequest(url, types);
  };
}

/*
{
  "id": "KyvcYfdhjMuXQeK4eoYc",
  "name": "HTML",
  "description": "Студент знакомится с HTML",
  "descriptionUrl": "https://guides.hexlet.io/markdown/",
  "type": ["htmlTask", "info"],
  "timeZone": 3,
  "dateTime": 1600291763391,
  "place": "class",
  "comment": "Создан и размещён на gh-pages файл HTML",
  "trainee": "Сергей Шаляпин",
  "courseName": "jsFrontEnd",
  "timeToImplementation": 4,
  "broadcastUrl": "Link on Video",
  "materialsLinks": ["\"link1\", \"link2\""],
  "block": "HTML",
  "result": "Студент знает HTML",
  "stack": ["HTML", "CSS", "Markdown"];
  "feedBack": "Cool";
  "deadline": 1600291764391;
  "videoLink": "string";
}
*/
