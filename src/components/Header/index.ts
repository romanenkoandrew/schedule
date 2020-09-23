import { connect } from 'react-redux';
import { switchMentorStudent, switchLayout, changeTimezone, changeCourse } from 'action-creators';
import Header from './Header';
import selector from './selector';

const mapDispatchToProps = {
  switchMentorStudent,
  switchLayout,
  changeTimezone,
  changeCourse
};

export default connect(selector, mapDispatchToProps)(Header);
