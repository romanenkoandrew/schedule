import React, { useState } from 'react';
import CalendarApp from 'components/Calendar';
import ModalContainer from 'components/ModalContainer';

const CalendarPage: React.FC = () => {
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
    <div className="evnt-body-wrapper">
      <div className="evnt-main-container">
        <CalendarApp openModal={openModalHandler} addId={addId} isOpenModal={isOpenModal} />
        {isOpenModal && <ModalContainer eventId={id} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />}
      </div>
    </div>
  );
};

export default CalendarPage;
