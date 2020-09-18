import { connect } from 'react-redux';
import TestBackend from './test-backend';
import selector from './selector';
import { getEvents, addNewEvent, updateEvent, deleteEvent, getEventById } from 'action-creators';

const mapDispatchToProps = { getEvents, addNewEvent, updateEvent, deleteEvent, getEventById };

export default connect(selector, mapDispatchToProps)(TestBackend);
