import { createSelector } from 'reselect';
import get from 'lodash/get';

export const mainSelector = (state: any) => get(state, 'main');

export const scoreSelector = createSelector(mainSelector, main => main.score);
