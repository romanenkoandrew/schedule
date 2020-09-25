import ActionTypes from 'action-types';
import { createAction as createAPIAction } from 'redux-api-middleware';
import { createAction } from 'redux-actions';
import { BASE_URL_BACKEND, TEAM_ID } from '../constants/resource/resource';

export const getDataRequest = (url: string, types: any) =>
  createAPIAction({
    method: 'GET',
    endpoint: `${BASE_URL_BACKEND}${TEAM_ID}${url}`,
    types
  });

export const getDataByIdRequest = (url: string, types: any) =>
  createAPIAction({
    method: 'GET',
    endpoint: `${BASE_URL_BACKEND}${TEAM_ID}${url}`,
    types
  });

export const postDataRequest = (url: string, data: any, types: any) =>
  createAPIAction({
    method: 'POST',
    endpoint: `${BASE_URL_BACKEND}${TEAM_ID}${url}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
    types
  });

export const putDataRequest = (url: string, data: any, types: any) =>
  createAPIAction({
    method: 'PUT',
    endpoint: `${BASE_URL_BACKEND}${TEAM_ID}${url}`,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
    types
  });

export const deleteDataByIdRequest = (url: string, types: any) =>
  createAPIAction({
    method: 'DELETE',
    endpoint: `${BASE_URL_BACKEND}${TEAM_ID}${url}`,
    headers: {
      Accept: 'application/json'
    },
    types
  });

export const getEvents = createAction(ActionTypes.GET_EVENTS_DATA);
export const getEventById = createAction(ActionTypes.GET_EVENT_DATA_BY_ID);
export const addNewEvent = createAction(ActionTypes.POST_EVENT_DATA);
export const updateEvent = createAction(ActionTypes.PUT_EVENT_DATA);
export const deleteEvent = createAction(ActionTypes.DELETE_EVENT_DATA_BY_ID);

export const getOrganizers = createAction(ActionTypes.GET_ORGANIZERS_DATA);
export const getOrganizerById = createAction(ActionTypes.GET_ORGANIZER_DATA_BY_ID);
export const addNewOrganizer = createAction(ActionTypes.POST_ORGANIZER_DATA);
export const updateOrganizer = createAction(ActionTypes.PUT_ORGANIZER_DATA);
export const deleteOrganizer = createAction(ActionTypes.DELETE_ORGANIZER_DATA_BY_ID);

export const switchMentorStudent = createAction(ActionTypes.SWITCH_MENTOR_STUDENT);
export const switchLayout = createAction(ActionTypes.SWITCH_LAYOUT);
export const changeTimezone = createAction(ActionTypes.CHANGE_TIMEZONE);
export const changeCourse = createAction(ActionTypes.CHANGE_COURSE);
