import { connect } from 'react-redux';
import { getEventById, updateEvent, addNewEvent } from 'action-creators';
import ModalContainer from './ModalContainer';
import selector from './selector';

const mapDispatchToProps = { getEventById, updateEvent, addNewEvent };

export default connect(selector, mapDispatchToProps)(ModalContainer);
