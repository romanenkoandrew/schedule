import React from 'react';
import { Button, Spin } from 'antd';
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
const button = css`
  margin-right: 10px;
`;

interface ITestComponent {
  score: number;
  eventsData: {};
  loading: boolean;
  increment: ActionTypeProps;
  decrement: ActionTypeProps;
  reset: ActionTypeProps;
  getEvents: ActionType;
  addNewEvent: ActionTypeProps;
  updateEvent: ActionTypeProps;
  getEventById: ActionTypeProps;
  deleteEvent: ActionTypeProps;
  getOrganizers: ActionType;
  addNewOrganizer: ActionTypeProps;
  updateOrganizer: ActionTypeProps;
  getOrganizerById: ActionTypeProps;
  deleteOrganizer: ActionTypeProps;
}

const TestComponent: React.FC<ITestComponent> = props => {
  console.log(props);
  const {
    score,
    eventsData,
    increment,
    decrement,
    reset,
    getEvents,
    addNewEvent,
    updateEvent,
    getEventById,
    deleteEvent,
    getOrganizers,
    addNewOrganizer,
    updateOrganizer,
    getOrganizerById,
    deleteOrganizer
  } = props;
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
    getEvents();
  };
  const handleClickPostData = () => {
    addNewEvent({
      id: '',
      name: 'name',
      description: 'description',
      descriptionUrl: 'descriptionUrl',
      type: 'type',
      timeZone: 'timeZone+',
      dateTime: '2020-01-23',
      place: 'place',
      comment: 'comment',
      game: '13'
    });
  };

  const handleClickPutData = (id: string) => {
    updateEvent({
      id,
      name: 'name2',
      description: 'description2',
      descriptionUrl: 'descriptionUrl2',
      type: 'type2',
      timeZone: 'timeZone+2',
      dateTime: '2020-01-25',
      place: 'place2',
      comment: 'comment2'
    });
  };

  const handleClickGetByIdData = (id: string) => {
    getEventById(id);
  };

  const handleClickDeleteByIdData = (id: string) => {
    deleteEvent(id);
  };

  const handleClickDataOrganizers = () => {
    getOrganizers();
  };
  const handleClickPostDataOrganizer = () => {
    addNewOrganizer({
      id: '',
      name: 'Jhon'
    });
  };

  const handleClickPutDataOrganizer = (id: string) => {
    updateOrganizer({
      id,
      name: 'Peter'
    });
  };

  const handleClickGetByIdDataOrganizer = (id: string) => {
    getOrganizerById(id);
  };

  const handleClickDeleteByIdDataOrganizer = (id: string) => {
    deleteOrganizer(id);
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
        Events Test
        <Button type="primary" onClick={handleClickData} css={button}>
          GetData
        </Button>
        <Button type="primary" onClick={handleClickPostData} css={button}>
          Post Data
        </Button>
        <Button type="primary" onClick={() => handleClickPutData('NTIqZe807rRCaYIOU06u')} css={button}>
          Put Data
        </Button>
        <Button type="primary" onClick={() => handleClickGetByIdData('NTIqZe807rRCaYIOU06u')} css={button}>
          Get by id Data
        </Button>
        <Button type="primary" onClick={() => handleClickDeleteByIdData('NTIqZe807rRCaYIOU06u')} css={button}>
          Delete Data
        </Button>
        <Button type="primary" onClick={handleClickDataOrganizers} css={button}>
          Get Organizers
        </Button>
        <Button type="primary" onClick={handleClickPostDataOrganizer} css={button}>
          Post Organizer
        </Button>
        <Button type="primary" onClick={() => handleClickPutDataOrganizer('3Xz9VwTlqHbh94Siy3ss')} css={button}>
          Put Organizer
        </Button>
        <Button type="primary" onClick={() => handleClickGetByIdDataOrganizer('3Xz9VwTlqHbh94Siy3ss')} css={button}>
          Get by id Organizer
        </Button>
        <Button type="primary" onClick={() => handleClickDeleteByIdDataOrganizer('3Xz9VwTlqHbh94Siy3ss')} css={button}>
          Delete Organizer
        </Button>
        <Textarea />
      </div>
    </div>
  );
};

export default TestComponent;
