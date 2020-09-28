import React, { useState } from 'react';
import ScheduleList from 'components/schedule-list';
import BugCatcher from 'components/bug-catcher';
import ModalContainer from 'components/ModalContainer';

const List: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [id, setId] = useState('');

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };
  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const addId = (id: string) => {
    setId(id);
  };
  
  return (
    <div>
        <BugCatcher>
      <ScheduleList openModal={openModalHandler} addId={addId} isOpenModal={isOpenModal} />
      {isOpenModal && <ModalContainer eventId={id} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />}
        </BugCatcher>
    </div>
  );
};

export default List;
