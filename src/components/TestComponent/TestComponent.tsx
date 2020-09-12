import React from 'react';
import { Button } from 'antd';
import { css } from '@emotion/core';
import { ActionType, ActionTypeProps } from 'types';
import Textarea from '../Textarea';

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
const margin = css`
  margin: 20px;
`;

interface ITestComponent {
  score: number;
  data: {};
  increment: ActionTypeProps;
  decrement: ActionTypeProps;
  reset: ActionTypeProps;
  getData: ActionType;
}

const TestComponent: React.FC<ITestComponent> = props => {
  const { score, data, increment, decrement, reset, getData } = props;
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
  const handleClickData = () => {
    getData();
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
      <div css={margin}>
        <Button type="primary" onClick={handleClickData}>
          GetData
        </Button>
        <Textarea />
      </div>
    </div>
  );
};

export default TestComponent;
