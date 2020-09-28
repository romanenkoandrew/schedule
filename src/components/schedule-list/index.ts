import { connect } from 'react-redux';
import ScheduleList from './schedule-list';
import selector from './selector';
import { getEvents, changeTypeColors } from 'action-creators';

const mapDispatchToProps = { getEvents, changeTypeColors };

export default connect(selector, mapDispatchToProps)(ScheduleList);