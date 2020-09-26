import React from 'react';
import ScheduleTable from 'components/schedule-table';
import { css } from '@emotion/core';
import ModalContainer from 'components/ModalContainer';
import { Button } from 'antd';

const Main: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const closeModalHandler = () => {
    setIsOpenModal(false);
  };
  const openModalHandler = () => {
    setIsOpenModal(true);
  };
  const eventId = '1GIPCkceqy7BWZL0E2FO';
  return (
    <div>
      <Button type="primary" onClick={openModalHandler}>
        MODAL
      </Button>
      <ScheduleTable />
      {isOpenModal && (
        <ModalContainer eventId={eventId} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />
      )}
    </div>
  );
};

export default Main;
