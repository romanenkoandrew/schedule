import React from 'react';
import { css } from '@emotion/core';
import { Spin } from 'antd';

interface ITestComponent {
  eventsData: {};
  loading: boolean;
  eventData: {};
  organizersData: {};
  organizerData: {};
}

const text = () => css`
  width: 200;
  height: 500px;
  margin: 40px;
  border: 1px solid black;
  font-size: 20px;
`;

const Textarea: React.FC<ITestComponent> = ({
  eventsData = {},
  loading,
  eventData,
  organizersData = {},
  organizerData
}) => {
  console.log(loading);
  if (loading) return <Spin />;
  return (
    <div>
      <pre css={text}>{JSON.stringify(eventsData, null, 4)}</pre>
      <pre css={text}>{JSON.stringify(eventData, null, 4)}</pre>
      Organizers Test
      <pre css={text}>{JSON.stringify(organizersData, null, 4)}</pre>
      <pre css={text}>{JSON.stringify(organizerData, null, 4)}</pre>
    </div>
  );
};

export default Textarea;
