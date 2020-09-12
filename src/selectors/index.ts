import { createSelector } from 'reselect';
import get from 'lodash/get';

export const MainSelector = (state: any) => get(state, 'main');
export const scoreSelector = createSelector(MainSelector, main => main.score);

export const EventsDataSelector = (state: any) => get(state, 'data');
export const eventsDataSelector = createSelector(EventsDataSelector, data => data.eventsData);

export const EventDataSelector = (state: any) => get(state, 'data');
export const eventDataSelector = createSelector(EventDataSelector, data => data.eventData);

export const OrganizersDataSelector = (state: any) => get(state, 'data');
export const organizersDataSelector = createSelector(EventsDataSelector, data => data.organizersData);

export const OrganizerDataSelector = (state: any) => get(state, 'data');
export const organizerDataSelector = createSelector(EventDataSelector, data => data.organizerData);

export const LoadingDataSelector = (state: any) => get(state, 'data');
export const loadingDataSelector = createSelector(LoadingDataSelector, data => data.loading);

export const ErrorDataSelector = (state: any) => get(state, 'data');
export const errorDataSelector = createSelector(ErrorDataSelector, data => data.error);
