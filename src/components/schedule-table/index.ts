import { connect } from 'react-redux';
import ScheduleTable from './schedule-table';
import selector from './selector';
import { getEvents, addNewEvent, deleteEvent } from 'action-creators';

const mapDispatchToProps = { getEvents, addNewEvent, deleteEvent };

export default connect(selector, mapDispatchToProps)(ScheduleTable);
