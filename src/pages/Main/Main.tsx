import React from 'react';
import TestComponent from 'components/TestComponent';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';

const linkStyle = () => css`
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 10px;
`;

const Main: React.FC = () => {
  return (
    <div>
      {/* <TestComponent /> */}
      <div css={linkStyle}>
        <Link to="/calendar">to Calendar</Link>
        <Link to="/list">to List</Link>
        <Link to="/modal">to Modal</Link>
      </div>
    </div>
  );
};

export default Main;
