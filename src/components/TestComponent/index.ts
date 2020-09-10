import { connect } from 'react-redux';
import { increment, decrement, reset } from 'action-creators';
import TestComponent from './TestComponent';
import selector from './selector';

const mapDispatchToProps = {
  increment,
  decrement,
  reset
};

export default connect(selector, mapDispatchToProps)(TestComponent);
