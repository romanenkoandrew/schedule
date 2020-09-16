import { connect, ConnectedProps } from 'react-redux';
import Modal from './Modal';

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
export type Props = PropsFromRedux;

export default connector(Modal);
