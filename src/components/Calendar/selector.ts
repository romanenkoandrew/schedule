import {
  eventsDataSelector,
  loadingDataSelector,
  switchMentorStudentSelector,
  changeTimezoneSelector,
  changeCourseSelector,
  changeTypeColorSelector,
  errorDataSelector
} from 'selectors';

import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  eventsData: eventsDataSelector,
  loading: loadingDataSelector,
  isStudent: switchMentorStudentSelector,
  timeZone: changeTimezoneSelector,
  courses: changeCourseSelector,
  typeColors: changeTypeColorSelector,
  error: errorDataSelector
});
