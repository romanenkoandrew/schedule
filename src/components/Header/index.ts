import { connect } from 'react-redux';
import { switchMentorStudent } from 'action-creators';
import Header from './Header';
import selector from './selector';

const mapDispatchToProps = {
  switchMentorStudent
};

export default connect(selector, mapDispatchToProps)(Header);
