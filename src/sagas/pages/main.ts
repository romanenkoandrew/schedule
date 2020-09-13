import { takeEvery, all, put } from 'redux-saga/effects';
import ActionTypes from 'action-types';
import { EventsService, OrganizerService } from '../../services';

const eventService = new EventsService();
const organizerService = new OrganizerService();

export function* getEventsWorker(): IterableIterator<{}> {
  yield put(eventService.getEvents() as any);
}

export function* getEventsWatcher() {
  yield takeEvery(ActionTypes.GET_EVENTS_DATA, getEventsWorker);
}

export function* getEventByIdWorker({ payload: id }: any): IterableIterator<{}> {
  yield put(eventService.getEventById(id) as any);
}

export function* getEventByIdWatcher() {
  yield takeEvery(ActionTypes.GET_EVENT_DATA_BY_ID, getEventByIdWorker);
}

export function* postEventWorker({ payload }: any): IterableIterator<{}> {
  yield put(eventService.addNewEvent(payload) as any);
}

export function* postEventWatcher() {
  yield takeEvery(ActionTypes.POST_EVENT_DATA, postEventWorker);
}

export function* putEventWorker({ payload }: any): IterableIterator<{}> {
  yield put(eventService.updateEvent(payload) as any);
}

export function* putEventWatcher() {
  yield takeEvery(ActionTypes.PUT_EVENT_DATA, putEventWorker);
}

export function* deleteEventByIdWorker({ payload: id }: any): IterableIterator<{}> {
  yield put(eventService.deleteEvent(id) as any);
}

export function* deleteEventByIdWatcher() {
  yield takeEvery(ActionTypes.DELETE_EVENT_DATA_BY_ID, deleteEventByIdWorker);
}

export function* getOrganizersWorker(): IterableIterator<{}> {
  yield put(organizerService.getOrganizers() as any);
}

export function* getOrganizersWatcher() {
  yield takeEvery(ActionTypes.GET_ORGANIZERS_DATA, getOrganizersWorker);
}

export function* getOrganizerByIdWorker({ payload: id }: any): IterableIterator<{}> {
  yield put(organizerService.getOrganizerById(id) as any);
}

export function* getOrganizerByIdWatcher() {
  yield takeEvery(ActionTypes.GET_ORGANIZER_DATA_BY_ID, getOrganizerByIdWorker);
}

export function* postOrganizerWorker({ payload }: any): IterableIterator<{}> {
  yield put(organizerService.addNewOrganizer(payload) as any);
}

export function* postOrganizerWatcher() {
  yield takeEvery(ActionTypes.POST_ORGANIZER_DATA, postOrganizerWorker);
}

export function* putOrganizerWorker({ payload }: any): IterableIterator<{}> {
  yield put(organizerService.updateOrganizer(payload) as any);
}

export function* putOrganizerWatcher() {
  yield takeEvery(ActionTypes.PUT_ORGANIZER_DATA, putOrganizerWorker);
}

export function* deleteOrganizerByIdWorker({ payload: id }: any): IterableIterator<{}> {
  yield put(organizerService.deleteOrganizer(id) as any);
}

export function* deleteOrganizerByIdWatcher() {
  yield takeEvery(ActionTypes.DELETE_ORGANIZER_DATA_BY_ID, deleteOrganizerByIdWorker);
}

export default function* mainSaga() {
  yield all([
    getEventsWatcher(),
    postEventWatcher(),
    putEventWatcher(),
    getEventByIdWatcher(),
    deleteEventByIdWatcher(),
    getOrganizersWatcher(),
    postOrganizerWatcher(),
    putOrganizerWatcher(),
    getOrganizerByIdWatcher(),
    deleteOrganizerByIdWatcher()
  ]);
}
