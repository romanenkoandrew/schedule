import { connect } from 'react-redux';
import { getEventById, updateEvent } from 'action-creators';
import ModalContainer from './ModalContainer';
import selector from './selector';

const mapDispatchToProps = { getEventById, updateEvent };

export default connect(selector, mapDispatchToProps)(ModalContainer);
