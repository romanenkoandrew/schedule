import React from 'react';
import { css } from '@emotion/core';

interface ITestComponent {
  data: {};
}

const text = () => css`
  width: 200;
  height: 200px;
  margin: 40px;
  border: 1px solid black;
  font-size: 20px;
`;

const Textarea: React.FC<ITestComponent> = ({ data = {} }) => {
  return (
    <div>
      <div css={text}>{JSON.stringify(data)}</div>
    </div>
  );
};

export default Textarea;
