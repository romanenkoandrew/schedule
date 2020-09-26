import { connect } from 'react-redux';
import { increment, decrement, reset, getEvents } from 'action-creators';
import Calendar from './Calendar';
import selector from './selector';

const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  getEvents
};

export default connect(selector, mapDispatchToProps)(Calendar);
