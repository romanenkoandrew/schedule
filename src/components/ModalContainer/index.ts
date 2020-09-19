import { connect } from 'react-redux';
import {} from 'action-creators';
import ModalContainer from './ModalContainer';
import selector from './selector';

const mapDispatchToProps = {};

export default connect(selector, mapDispatchToProps)(ModalContainer);
