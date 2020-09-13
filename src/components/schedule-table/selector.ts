import { eventsDataSelector, loadingDataSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  eventsData: eventsDataSelector,
  loading: loadingDataSelector
});
