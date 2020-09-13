import { createSelector } from 'reselect';
import get from 'lodash/get';

export const MainSelector = (state: any) => get(state, 'main');
export const scoreSelector = createSelector(MainSelector, main => main.score);

export const DataSelector = (state: any) => get(state, 'data');

export const eventsDataSelector = createSelector(DataSelector, data => data.eventsData);
export const eventDataSelector = createSelector(DataSelector, data => data.eventData);
export const organizersDataSelector = createSelector(DataSelector, data => data.organizersData);
export const organizerDataSelector = createSelector(DataSelector, data => data.organizerData);
export const loadingDataSelector = createSelector(DataSelector, data => data.loading);
export const errorDataSelector = createSelector(DataSelector, data => data.error);
