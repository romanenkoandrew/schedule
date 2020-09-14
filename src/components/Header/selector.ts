import { switchMentorStudentSelector } from 'selectors';
import { createStructuredSelector } from 'reselect';

export default createStructuredSelector({
  isMentor: switchMentorStudentSelector
});
