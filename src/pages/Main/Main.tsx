import React, { useState } from 'react';
import ScheduleTable from 'components/schedule-table';
import { css } from '@emotion/core';
import ModalContainer from 'components/ModalContainer';
import { Button } from 'antd';
import BugCatcher from 'components/bug-catcher';

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
      <BugCatcher>
        <ScheduleTable openModal={openModalHandler} addId={addId} isOpenModal={isOpenModal} />
        {isOpenModal && <ModalContainer eventId={id} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />}
        <Button type="primary" onClick={openModalHandler}>
          MODAL
        </Button>
      </BugCatcher>
    </div>
  );
};

export default Main;
