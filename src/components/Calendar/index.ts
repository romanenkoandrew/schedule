import { connect } from 'react-redux';
import {} from 'action-creators';
import Calendar from './Calendar';
import selector from './selector';

const mapDispatchToProps = {};

export default connect(selector, mapDispatchToProps)(Calendar);
