import {
  eventsDataSelector,
  loadingDataSelector,
  switchMentorStudentSelector,
  changeTimezoneSelector,
  changeCourseSelector,
  changeTypeColorSelector
} from 'selectors';

import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  eventsData: eventsDataSelector,
  loading: loadingDataSelector,
  isStudent: switchMentorStudentSelector,
  timeZone: changeTimezoneSelector,
  course: changeCourseSelector,
  typeColors: changeTypeColorSelector
});
