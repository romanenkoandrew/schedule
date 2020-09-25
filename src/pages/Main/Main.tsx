import React from 'react';
import TestComponent from 'components/TestComponent';
import ScheduleTable from 'components/schedule-table';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import ModalContainer from 'components/ModalContainer';
import { testData, emptyData } from 'constants/testData';
import { Button } from 'antd';

const linkStyle = () => css`
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
`;

const Main: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const closeModalHandler = () => {
    setIsOpenModal(false);
  };
  const openModalHandler = () => {
    setIsOpenModal(true);
  };
  const eventId = 'wE2GgY0grSQziMBhacLw';
  return (
    <div>
      <div css={linkStyle}>
        <Link to="/calendar">to Calendar</Link>
        <Link to="/list">to List</Link>
        <Link to="/modalStudent">to Student Modal</Link>
        <Link to="/modalMentor">to Mentor Modal</Link>
      </div>
      {/* <ScheduleTable /> */}
      {isOpenModal && (
        <ModalContainer eventId={eventId} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />
      )}
      <Button type="primary" onClick={openModalHandler}>
        MODAL
      </Button>
    </div>
  );
};

export default Main;
