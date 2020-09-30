import { connect } from 'react-redux';
import selector from './selector';
import BugCatcher from './bug-catcher';

const mapDispatchToProps = {};

export default connect(selector, mapDispatchToProps)(BugCatcher);
