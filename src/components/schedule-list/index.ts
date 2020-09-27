import { connect } from 'react-redux';
import ScheduleList from './schedule-list';
import selector from './selector';
import { getEvents } from 'action-creators';

const mapDispatchToProps = { getEvents };

export default connect(selector, mapDispatchToProps)(ScheduleList);
