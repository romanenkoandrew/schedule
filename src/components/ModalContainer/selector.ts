import {
  switchMentorStudentSelector,
  eventDataSelector,
  loadingDataSelector,
  changeTypeColorSelector,
  changeTimezoneSelector
} from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  isStudent: switchMentorStudentSelector,
  eventData: eventDataSelector,
  loading: loadingDataSelector,
  typeColor: changeTypeColorSelector,
  timeZoneHeader: changeTimezoneSelector
});
