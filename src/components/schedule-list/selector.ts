import {
  eventsDataSelector,
  loadingDataSelector,
  switchMentorStudentSelector,
  changeTimezoneSelector,
  changeCourseSelector
} from 'selectors';

import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  eventsData: eventsDataSelector,
  loading: loadingDataSelector,
  isStudent: switchMentorStudentSelector,
  timeZone: changeTimezoneSelector,
  course: changeCourseSelector
});
