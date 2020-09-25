import ActionTypes from 'action-types';

interface IState {
  eventsData: [];
  eventData: {};
  organizersData: [];
  organizerData: {};
  loading: boolean;
  error: boolean;
}

export const initState: IState = {
  eventsData: [],
  eventData: {},
  organizersData: [],
  organizerData: {},
  loading: false,
  error: false
};

export interface IEvent {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string[];
  timeZone: string;
  dateTime: number;
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
  feedBack: string;
  taskBreakpoints: number[];
  videoLink: string;
  isEventOnline: boolean;
  [propName: string]: any;
}

interface IAction {
  type: string;
  payload: IEvent;
}

const updateDataAfterUpdating = (data: [], item: IEvent) => {
  const indexInData = data.findIndex(({ id }) => id === item.id);
  const copyData: IEvent[] = [...data];
  copyData[indexInData] = item;
  return copyData;
};

const updateDataAfterDeleting = (data: [], item: IEvent) => {
  const indexInData = data.findIndex(({ id }) => id === item.id);
  const copyData: IEvent[] = [...data];
  copyData.splice(indexInData, 1);
  return copyData;
};

const reducer = (state = initState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.GET_EVENTS_DATA_REQUEST:
      return {
        ...state,
        eventsData: [],
        loading: true,
        error: false
      };
    case ActionTypes.GET_EVENTS_DATA_SUCCESS:
      const eventsData = action.payload.data;
      return {
        ...state,
        eventsData,
        loading: false,
        error: false
      };
    case ActionTypes.GET_EVENTS_DATA_FAILURE:
      return {
        ...state,
        eventsData: [],
        loading: false,
        error: true
      };

    case ActionTypes.GET_EVENT_DATA_BY_ID_REQUEST:
      return {
        ...state,
        eventData: {},
        loading: true,
        error: false
      };
    case ActionTypes.GET_EVENT_DATA_BY_ID_SUCCESS:
      const eventData = action.payload;
      return {
        ...state,
        eventData,
        loading: false,
        error: false
      };
    case ActionTypes.GET_EVENT_DATA_BY_ID_FAILURE:
      return {
        ...state,
        eventData: {},
        loading: false,
        error: true
      };

    case ActionTypes.POST_EVENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case ActionTypes.POST_EVENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case ActionTypes.POST_EVENT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ActionTypes.PUT_EVENT_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case ActionTypes.PUT_EVENT_DATA_SUCCESS:
      const updateEventsDataAfterPut = updateDataAfterUpdating(state.eventsData, action.payload);
      return {
        ...state,
        eventsData: updateEventsDataAfterPut,
        loading: false,
        error: false
      };
    case ActionTypes.PUT_EVENT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ActionTypes.DELETE_EVENT_DATA_BY_ID_REQUEST:
      return {
        ...state,
        loading: false,
        error: false
      };
    case ActionTypes.DELETE_EVENT_DATA_BY_ID_SUCCESS:
      const updateEventsDataAfterDelete = updateDataAfterDeleting(state.eventsData, action.payload);
      return {
        ...state,
        eventsData: updateEventsDataAfterDelete,
        loading: false,
        error: false
      };
    case ActionTypes.DELETE_EVENT_DATA_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ActionTypes.GET_ORGANIZERS_DATA_REQUEST:
      return {
        ...state,
        organizersData: [],
        loading: true,
        error: false
      };
    case ActionTypes.GET_ORGANIZERS_DATA_SUCCESS:
      const organizersData = action.payload.data;
      return {
        ...state,
        organizersData,
        loading: false,
        error: false
      };
    case ActionTypes.GET_ORGANIZERS_DATA_FAILURE:
      return {
        ...state,
        organizersData: [],
        loading: false,
        error: true
      };

    case ActionTypes.GET_ORGANIZER_DATA_BY_ID_REQUEST:
      return {
        ...state,
        organizerData: {},
        loading: true,
        error: false
      };
    case ActionTypes.GET_ORGANIZER_DATA_BY_ID_SUCCESS:
      const organizerData = action.payload;
      return {
        ...state,
        organizerData,
        loading: false,
        error: false
      };
    case ActionTypes.GET_ORGANIZER_DATA_BY_ID_FAILURE:
      return {
        ...state,
        organizerData: {},
        loading: false,
        error: true
      };

    case ActionTypes.POST_ORGANIZER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };
    case ActionTypes.POST_ORGANIZER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      };
    case ActionTypes.POST_ORGANIZER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ActionTypes.PUT_ORGANIZER_DATA_REQUEST:
      return {
        ...state,
        loading: false,
        error: false
      };
    case ActionTypes.PUT_ORGANIZER_DATA_SUCCESS:
      const updateOrganizersDataAfterPut = updateDataAfterUpdating(state.organizersData, action.payload);
      return {
        ...state,
        organizersData: updateOrganizersDataAfterPut,
        loading: false,
        error: false
      };
    case ActionTypes.PUT_ORGANIZER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    case ActionTypes.DELETE_ORGANIZER_DATA_BY_ID_REQUEST:
      return {
        ...state,
        loading: false,
        error: false
      };
    case ActionTypes.DELETE_ORGANIZER_DATA_BY_ID_SUCCESS:
      const updateOrganizersDataAfterDelete = updateDataAfterDeleting(state.organizersData, action.payload);
      return {
        ...state,
        organizersData: updateOrganizersDataAfterDelete,
        loading: false,
        error: false
      };
    case ActionTypes.DELETE_ORGANIZER_DATA_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };

    default: {
      return state;
    }
  }
};

export default reducer;
