import { switchMentorStudentSelector, eventDataSelector, loadingDataSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  isStudent: switchMentorStudentSelector,
  eventData: eventDataSelector,
  loading: loadingDataSelector
});
