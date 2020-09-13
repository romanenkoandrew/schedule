import { createSelector } from 'reselect';
import get from 'lodash/get';

export const MainSelector = (state: any) => get(state, 'main');
export const scoreSelector = createSelector(MainSelector, main => main.score);

export const DataSelector = (state: any) => get(state, 'data');
export const dataSelector = createSelector(DataSelector, data => data.data);
