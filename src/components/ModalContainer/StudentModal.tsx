import React from 'react';
import moment from 'moment';
import {
  Button,
  Modal,
  Divider,
  Input,
  Tag,
  Select,
  InputNumber,
  TimePicker,
  DatePicker,
  Checkbox,
  Tooltip,
  Radio,
  Result,
  Form,
  List
} from 'antd';
import { css } from '@emotion/core';
import { TYPES_WITH_COLORS, FILTERS } from 'constants/dataForTable';

interface IStudentModal {
  updateEvent: any;
  isStudent: boolean;
  eventData: {
    id: string;
    name: string;
    description: string;
    descriptionUrl: string;
    type: string[];
    timeZone: number;
    dateTime: number;
    place: string;
    comment: string;
    trainee: string;
    courseName: string;
    timeToImplementation: number;
    broadcastUrl: string;
    materialsLinks: string[];
    block: string;
    result: string;
    stack: string[];
    deadline: number;
    videoLink: string;
    feedBack: string[];
    isFeedback: boolean;
    isEventOnline: boolean;
    [propName: string]: any;
  };
}

const timeFormat = 'HH:mm';
const dateFormat = 'DD.MM.YYYY';
const { TextArea } = Input;

const StudentModal: React.FC<IStudentModal> = ({ eventData, updateEvent, isStudent }) => {
  const {
    id,
    name,
    description,
    descriptionUrl,
    type,
    timeZone,
    dateTime,
    deadline,
    place,
    comment,
    trainee,
    courseName,
    timeToImplementation,
    broadcastUrl,
    materialsLinks,
    block,
    result,
    stack,
    feedBack,
    isFeedback,
    isEventOnline,
    videoLink
  } = eventData;

  const [isOpenFeedbaks, setIsOpenFeedbaks] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState({
    id: id,
    name: name,
    description: description,
    descriptionUrl: descriptionUrl,
    type: type,
    timeZone: timeZone,
    dateTime: dateTime,
    deadline: deadline,
    place: place,
    comment: comment,
    trainee: trainee,
    courseName: courseName,
    timeToImplementation: timeToImplementation,
    broadcastUrl: broadcastUrl,
    materialsLinks: materialsLinks,
    block: block,
    result: result,
    stack: stack,
    feedBack: feedBack,
    isFeedback: isFeedback,
    isEventOnline: isEventOnline,
    videoLink: videoLink
  });
  const newEventFeedbackHandler = (e: any) => {
    setNewEvent({ ...newEvent, feedBack: [...feedBack, e.target.value] });
  };
  const sendFeedback = () => {
    updateEvent(newEvent);
  };

  const toogleFeedbaks = () => {
    setIsOpenFeedbaks(!isOpenFeedbaks);
  };

  return (
    <>
      <div className="wrapper-title">
        <Divider />
        <h1>{name}</h1>
        <div>
          {type &&
            type.map(el => {
              return (
                <Tag key={el} color={TYPES_WITH_COLORS[el]}>
                  {el}
                </Tag>
              );
            })}
        </div>
      </div>
      <Divider />
      <div className="wrapper-content">
        <aside>
          <div className="wrapper-aside">
            <div className="dates">
              <div className="date-title">Task start</div>
              <div className="date-description">
                <span className="start-date">{moment(dateTime).format(`${timeFormat} ${dateFormat}`)}</span>
              </div>
            </div>
            <div className="deadline">
              <div className="deadline-title">Deadline</div>
              <div className="deadline-date">{moment(deadline).format(`${timeFormat} ${dateFormat}`)}</div>
            </div>
            <div className="wrapper-time-to-finish">
              <div className="time-to-finish-title">Needed time to finish</div>
              <div className="time-to-finish">
                <img src="./assets/img/clock-circle.svg" alt="clock" />
                &nbsp;&nbsp;{' '}
                <span>
                  {timeToImplementation <= 1 ? `${timeToImplementation} hour` : `${timeToImplementation} hours`}
                </span>
              </div>
            </div>
            <div className="stack">
              <div className="stack-title">Stack</div>
              <ul>
                {stack &&
                  stack.map(el => {
                    return <li key={el}>{el}</li>;
                  })}
              </ul>
            </div>
            <p>
              This event will be <b>{isEventOnline ? 'Online' : 'Offline'}</b>
            </p>
            {!isEventOnline && (
              <>
                <h4>Location:</h4>
                <p>{place}</p>
              </>
            )}
          </div>
        </aside>
        <section className="description">
          <h2>Course: {courseName}</h2>
          <h2>Description</h2>
          <a className="description-link" href={descriptionUrl}>
            {descriptionUrl}
          </a>
          <p>{description}</p>
          <div className="links-wrapper">
            <h2>Materials:</h2>
            <ul>
              {materialsLinks &&
                materialsLinks.map(el => {
                  return (
                    <li key={el}>
                      <a href={el}>{el}</a>
                    </li>
                  );
                })}
            </ul>
          </div>
          This event was prepared by <b>{trainee}</b>
          {isFeedback && isStudent ? (
            <Form name="form" onFinish={sendFeedback} layout="vertical" css={marginTop}>
              <Form.Item
                label="Feedback:"
                name="feedBack"
                rules={[{ required: true, message: 'Please input your feedback!' }]}
              >
                <TextArea placeholder="Leave your feedback in this field" onChange={newEventFeedbackHandler} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Send</Button>
              </Form.Item>
            </Form>
          ) : null}
          {!isStudent ? (
            <Button css={marginTop} onClick={toogleFeedbaks}>
              {isOpenFeedbaks ? 'Close feedbaks' : 'Show feedbaks'}
            </Button>
          ) : null}
          {!isStudent && isOpenFeedbaks ? (
            <ol>
              {feedBack.map(el => (
                <li key={el}>{el}</li>
              ))}
            </ol>
          ) : null}
        </section>
      </div>
      <Divider />
    </>
  );
};

const marginTop = css`
  margin-top: 10px;
`;

export default StudentModal;
