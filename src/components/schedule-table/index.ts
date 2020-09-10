import { connect } from 'react-redux';
import { increment, decrement, reset } from 'action-creators';
import ScheduleTable from './schedule-table';
import selector from './selector';

const mapDispatchToProps = {};

export default connect(selector, mapDispatchToProps)(ScheduleTable);
