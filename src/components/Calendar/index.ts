import { connect } from 'react-redux';
import { increment, decrement, reset, getData } from 'action-creators';
import Calendar from './Calendar';
import selector from './selector';

const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  getData
};

export default connect(selector, mapDispatchToProps)(Calendar);
