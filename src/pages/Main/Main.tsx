import React from 'react';
import TestComponent from 'components/TestComponent';
import ScheduleTable from 'components/schedule-table';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import ModalContainer from 'components/ModalContainer';
import { testData, emptyData } from 'constants/testData';

const linkStyle = () => css`
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
`;

const Main: React.FC = () => {
  return (
    <div>
      <div css={linkStyle}>
        <Link to="/calendar">to Calendar</Link>
        <Link to="/list">to List</Link>
        <Link to="/modalStudent">to Student Modal</Link>
        <Link to="/modalMentor">to Mentor Modal</Link>
      </div>
      {/* <ScheduleTable /> */}
      <ModalContainer testData={testData} />
    </div>
  );
};

export default Main;
