import { connect } from 'react-redux';
import {} from 'action-creators';
import Textarea from './Textarea';
import selector from './selector';

const mapDispatchToProps = {};

export default connect(selector, mapDispatchToProps)(Textarea);
