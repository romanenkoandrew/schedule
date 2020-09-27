import React, { useState } from 'react';
import ScheduleTable from 'components/schedule-table';
import { css } from '@emotion/core';
import ModalContainer from 'components/ModalContainer';
import { Button } from 'antd';

const Main: React.FC = () => {
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
      <ScheduleTable openModal={openModalHandler} addId={addId} isOpenModal={isOpenModal} />
      {isOpenModal && <ModalContainer eventId={id} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />}
    </div>
  );
};

export default Main;
