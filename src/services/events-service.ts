import {
  getDataRequest,
  postDataRequest,
  putDataRequest,
  deleteDataByIdRequest,
  getDataByIdRequest
} from '../action-creators';
import ActionTypes from 'action-types';

export interface Event {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: string;
  place: string;
  comment: string;
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

  addNewEvent = (eventData: Event) => {
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

  updateEvent = (eventData: any) => {
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
