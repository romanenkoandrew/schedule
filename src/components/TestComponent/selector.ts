import {
  scoreSelector,
  eventsDataSelector,
  loadingDataSelector,
  eventDataSelector,
  organizersDataSelector,
  organizerDataSelector
} from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  score: scoreSelector,
  eventsData: eventsDataSelector,
  eventData: eventDataSelector,
  organizersData: organizersDataSelector,
  organizerData: organizerDataSelector,
  loading: loadingDataSelector
});
