import { connect } from 'react-redux';
import ScheduleTable from './schedule-table';
import selector from './selector';
import { getEvents, addNewEvent, deleteEvent, updateEvent } from 'action-creators';

const mapDispatchToProps = { getEvents, addNewEvent, deleteEvent, updateEvent };

export default connect(selector, mapDispatchToProps)(ScheduleTable);
