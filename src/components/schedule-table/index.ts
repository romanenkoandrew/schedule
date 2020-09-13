import { connect } from 'react-redux';
import ScheduleTable from './schedule-table';
import selector from './selector';
import { getEvents } from 'action-creators';

const mapDispatchToProps = { getEvents };

export default connect(selector, mapDispatchToProps)(ScheduleTable);
