import { connect } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  getEvents,
  addNewEvent,
  updateEvent,
  getEventById,
  deleteEvent,
  getOrganizers,
  addNewOrganizer,
  updateOrganizer,
  getOrganizerById,
  deleteOrganizer
} from 'action-creators';
import TestComponent from './TestComponent';
import selector from './selector';

const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  getEvents,
  addNewEvent,
  updateEvent,
  getEventById,
  deleteEvent,
  getOrganizers,
  addNewOrganizer,
  updateOrganizer,
  getOrganizerById,
  deleteOrganizer
};

export default connect(selector, mapDispatchToProps)(TestComponent);
