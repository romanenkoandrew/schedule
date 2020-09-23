import {
  eventsDataSelector,
  loadingDataSelector,
  eventDataSelector,
  organizersDataSelector,
  organizerDataSelector
} from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  eventsData: eventsDataSelector,
  eventData: eventDataSelector,
  organizersData: organizersDataSelector,
  organizerData: organizerDataSelector,
  loading: loadingDataSelector
});
