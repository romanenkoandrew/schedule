import {
  getDataRequest,
  postDataRequest,
  putDataRequest,
  deleteDataByIdRequest,
  getDataByIdRequest
} from '../action-creators';
import ActionTypes from 'action-types';

export interface Organizer {
  id: string;
  name: string;
}
export default class OrganizerService {
  getOrganizers = () => {
    const url = `/organizers`;
    const types = [
      ActionTypes.GET_ORGANIZERS_DATA_REQUEST,
      ActionTypes.GET_ORGANIZERS_DATA_SUCCESS,
      ActionTypes.GET_ORGANIZERS_DATA_FAILURE
    ];
    return getDataRequest(url, types);
  };

  addNewOrganizer = (organizerData: Organizer) => {
    const url = `/organizer`;
    const types = [
      ActionTypes.POST_ORGANIZER_DATA_REQUEST,
      ActionTypes.POST_ORGANIZER_DATA_SUCCESS,
      ActionTypes.POST_ORGANIZER_DATA_FAILURE
    ];
    return postDataRequest(url, organizerData, types);
  };

  getOrganizerById = (id: string) => {
    const url = `/organizer/${id}`;
    const types = [
      ActionTypes.GET_ORGANIZER_DATA_BY_ID_REQUEST,
      ActionTypes.GET_ORGANIZER_DATA_BY_ID_SUCCESS,
      ActionTypes.GET_ORGANIZER_DATA_BY_ID_FAILURE
    ];
    return getDataByIdRequest(url, types);
  };

  updateOrganizer = (organizerData: Organizer) => {
    const id = organizerData.id;
    const url = `/organizer/${id}`;
    const types = [
      ActionTypes.PUT_ORGANIZER_DATA_REQUEST,
      ActionTypes.PUT_ORGANIZER_DATA_SUCCESS,
      ActionTypes.PUT_ORGANIZER_DATA_FAILURE
    ];
    return putDataRequest(url, organizerData, types);
  };

  deleteOrganizer = (id: string) => {
    const url = `/organizer/${id}`;
    const types = [
      ActionTypes.DELETE_ORGANIZER_DATA_BY_ID_REQUEST,
      ActionTypes.DELETE_ORGANIZER_DATA_BY_ID_SUCCESS,
      ActionTypes.DELETE_ORGANIZER_DATA_BY_ID_FAILURE
    ];
    return deleteDataByIdRequest(url, types);
  };
}
