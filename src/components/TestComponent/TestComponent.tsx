import React from 'react';
import { Button } from 'antd';
import { css } from '@emotion/core';
import { ActionType } from 'src/types';

const buttons = css`
  display: flex;
  justify-content: space-evenly;
  width: 300px;
  margin-top: 10px;
`;
const scoreStyle = css`
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`;

interface ITestComponent {
  score: number;
  increment: ActionType;
  decrement: ActionType;
  reset: ActionType;
}

const TestComponent: React.FC<ITestComponent> = props => {
  const { score, increment, decrement, reset } = props;
  console.log({ increment: score });

  const handleClickInc = () => {
    increment({ increment: score });
  };
  const handleClickDec = () => {
    decrement({ decrement: score });
  };
  const handleClickReset = () => {
    reset({ reset: score });
  };
  return (
    <div>
      <span css={scoreStyle}>Counter: {score} </span>
      <div css={buttons}>
        <Button type="primary" onClick={handleClickInc}>
          Increment
        </Button>
        <Button type="dashed" onClick={handleClickDec}>
          Decrement
        </Button>
        <Button danger onClick={handleClickReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TestComponent;
