import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, Input, Spin } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { TYPES_WITH_COLORS, FILTERS } from 'constants/dataForTable';
import { css } from '@emotion/core';
import { any } from 'ramda';
import { isArguments } from 'lodash';
import { getDateFromTimeStamp, getTimeFromTimeStamp } from 'utils/utils';

const TestBackend = (props: any) => {
  const { getEvents, eventsData, loading, addNewEvent, deleteEvent, updateEvent, getEventById, event } = props;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionUrl, setDescriptionUrl] = useState('');
  const [type, setType] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [place, setPlace] = useState('');
  const [comment, setComment] = useState('');
  const [trainee, setTrainee] = useState('');
  const [courseName, setCourseName] = useState('');
  const [timeToComplete, setTimeToComplete] = useState('');
  const [broadcastUrl, setBroadcastUrl] = useState('');
  const [materialsLinks, setMaterialsLinks] = useState('');
  const [block, setBlock] = useState('');
  const [result, setResult] = useState('');

  const idChange = (event: any) => {
    setId(event.target.value);
  };

  const nameChange = (event: any) => {
    setName(event.target.value);
  };

  const descriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const descriptionUrlChange = (event: any) => {
    setDescriptionUrl(event.target.value);
  };

  const typeChange = (event: any) => {
    setType(event.target.value);
  };

  const timeZoneChange = (event: any) => {
    setTimeZone(event.target.value);
  };

  const dateTimeChange = (event: any) => {
    setDateTime(event.target.value);
  };

  const placeChange = (event: any) => {
    setPlace(event.target.value);
  };

  const commentChange = (event: any) => {
    setComment(event.target.value);
  };

  const traineeChange = (event: any) => {
    setTrainee(event.target.value);
  };

  const courseNameChange = (event: any) => {
    setCourseName(event.target.value);
  };

  const timeToCompleteChange = (event: any) => {
    setTimeToComplete(event.target.value);
  };

  const broadcastUrlChange = (event: any) => {
    setBroadcastUrl(event.target.value);
  };

  const materialsLinksChange = (event: any) => {
    setMaterialsLinks(event.target.value);
  };

  const blockChange = (event: any) => {
    setBlock(event.target.value);
  };

  const resultChange = (event: any) => {
    setResult(event.target.value);
  };

  const createObject = () => {
    return {
      id,
      name,
      description,
      descriptionUrl,
      type,
      timeZone,
      dateTime,
      place,
      comment,
      trainee,
      courseName,
      timeToComplete,
      broadcastUrl,
      materialsLinks,
      block,
      result
    };
  };

  const getDataHandle = () => {
    const data = createObject();
    getEvents();
  };

  const postDataHandle = () => {
    const data = createObject();
    addNewEvent(data);
  };

  const updateDataHandle = () => {
    updateEvent(id);
  };

  const deleteDataHandle = () => {
    deleteEvent(id);
  };

  const getByIdDataHandle = () => {
    getEventById(id);
    console.log(event);
  };

  return (
    <div>
      <p
        css={css`
          margin-bottom: 20px;
          font-size: 1rem;
          font-weight: bold;
        `}
      >
        Для кнопок "GET BY ID", "DELETE" в инпут вводите только id события. Для "PUT" вводите id и данные, которые
        хотите изменить. Таблица при этом будет меняться сразу. После "POST" нужно нажать "GET", чтобы таблица
        обновилась. id берите из JSON справа от инпутов.
      </p>
      <div css={some}>
        <div css={container}>
          <div>
            id:
            <input onChange={idChange} placeholder="uHFF2obtR8iw3xcELOpI" css={input} />
          </div>
          <div>
            name:
            <input onChange={nameChange} placeholder="Что такое Markdown" css={input} />
          </div>
          <div>
            description:
            <input
              onChange={descriptionChange}
              placeholder="Студент знаком с синтаксисом Markdown и может его применить"
              css={input}
            />
          </div>
          <div>
            descriptionUrl:
            <input onChange={descriptionUrlChange} placeholder="https://guides.hexlet.io/markdown/" css={input} />
          </div>
          <div>
            type:
            <input onChange={typeChange} placeholder="selfEducation" css={input} />
          </div>
          <div>
            timeZone:
            <input onChange={timeZoneChange} placeholder="3" css={input} />
          </div>
          <div>
            dateTime:
            <input type="date" onChange={dateTimeChange} placeholder="15-09-2020" css={input} />
          </div>
          <div>
            place:
            <input onChange={placeChange} placeholder="street" css={input} />
          </div>
          <div>
            comment:
            <input
              onChange={commentChange}
              placeholder="Создан и размещён на gh-pages файл cv md с cv студента"
              css={input}
            />
          </div>
          <div>
            trainee:
            <input onChange={traineeChange} placeholder="Антон Белый" css={input} />
          </div>
          <div>
            courseName:
            <input onChange={courseNameChange} placeholder="jsFrontEnd" css={input} />
          </div>
          <div>
            timeToComplete:
            <input onChange={timeToCompleteChange} placeholder="3h" css={input} />
          </div>
          <div>
            broadcastUrl:
            <input onChange={broadcastUrlChange} placeholder="Link on Video" css={input} />
          </div>
          <div>
            materialsLinks:
            <input onChange={materialsLinksChange} placeholder="[link1, link2]" css={input} />
          </div>
          <div>
            block:
            <input onChange={blockChange} placeholder="Markdown" css={input} />
          </div>
          <div>
            result:
            <input
              onChange={resultChange}
              placeholder="Студент знаком с синтаксисом Markdown и может его применить"
              css={input}
            />
          </div>
        </div>
        <div>{JSON.stringify(eventsData, null, 2)}</div>
      </div>
      <div className="buttons">
        <Button onClick={getDataHandle} css={btn} type="primary">
          GET
        </Button>
        <Button onClick={postDataHandle} css={btn} type="primary">
          POST
        </Button>
        <Button onClick={updateDataHandle} css={btn} type="primary">
          PUT
        </Button>
        <Button onClick={deleteDataHandle} css={btn} type="primary" danger>
          DELETE
        </Button>
        <Button onClick={getByIdDataHandle} css={btn} type="primary">
          GET BY ID
        </Button>
        <Button css={btn} type="primary"></Button>
      </div>
    </div>
  );
};

export default TestBackend;

const container = css`
  margin: 10px;
  display: flex;
  flex-direction: column;
`;

const btn = css`
  margin: 10px;
`;

const input = css`
  width: 700px;
  margin: 3px;
`;

const some = css`
  display: flex;
`;
