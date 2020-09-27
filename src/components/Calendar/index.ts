import { connect } from 'react-redux';
import { getEvents, addNewEvent, deleteEvent, updateEvent, changeTypeColors } from 'action-creators';
import Calendar from './Calendar';
import selector from './selector';

const mapDispatchToProps = {
  getEvents
};

export default connect(selector, mapDispatchToProps)(Calendar);
