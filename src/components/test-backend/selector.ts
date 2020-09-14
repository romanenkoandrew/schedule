import { eventsDataSelector, loadingDataSelector, eventDataSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  eventsData: eventsDataSelector,
  loading: loadingDataSelector,
  event: eventDataSelector
});
