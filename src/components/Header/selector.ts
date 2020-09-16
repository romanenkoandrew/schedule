import { switchMentorStudentSelector, switchLayoutSelector, changeTimezoneSelector, changeCourseSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  isStudent: switchMentorStudentSelector,
  layout: switchLayoutSelector,
  timezone: changeTimezoneSelector,
  courses: changeCourseSelector
});
