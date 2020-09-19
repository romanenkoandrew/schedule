import { connect } from 'react-redux';
import {} from 'action-creators';
import ModalWindow from './ModalWindow';
import selector from './selector';

const mapDispatchToProps = {};

export default connect(selector, mapDispatchToProps)(ModalWindow);
