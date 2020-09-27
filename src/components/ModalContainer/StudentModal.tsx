import React from 'react';
import moment from 'moment';
import { Button, Divider, Input, Tag, Form, Select, TimePicker } from 'antd';
import { css } from '@emotion/core';
import { FILTERS } from 'constants/dataForTable';
import Timezones from 'constants/timezone/timezone';
import { getTimeFromString, getDateFromTimeStamp } from 'utils/utils';

interface IStudentModal {
  timeZoneHeader: number;
  updateEvent: any;
  isStudent: boolean;
  typeColor: any;
  eventData: {
    id: string;
    name: string;
    description: string;
    descriptionUrl: string;
    type: string[];
    timeZone: number;
    dateTime: [number, string];
    place: string;
    comment: string;
    trainee: string;
    courseName: string;
    timeToImplementation: number;
    broadcastUrl: string;
    materialsLinks: string[];
    result: string;
    deadline: [number, string];
    feedBack: string[];
    isFeedback: boolean;
    isEventOnline: boolean;
    [propName: string]: any;
  };
}

const timeFormat = 'HH:mm';
const dateFormat = 'DD.MM.YYYY';
const { TextArea } = Input;
const timezoneOptions = Timezones.map((i, idx) => (
  <Select.Option key={idx.toString()} value={i.value}>
    {i.name}
  </Select.Option>
));

const StudentModal: React.FC<IStudentModal> = ({ eventData, updateEvent, isStudent, typeColor, timeZoneHeader }) => {
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
    result,
    feedBack,
    isFeedback,
    isEventOnline
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
    result: result,
    feedBack: feedBack,
    isFeedback: isFeedback,
    isEventOnline: isEventOnline
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
  const newEventTimezoneHandler = (value: any) => {
    setNewEvent({ ...newEvent, timeZone: value });
  };
  const defaultTypes = () => {
    const index: any = [];
    let defTypes: any = [];
    type.map(el => {
      FILTERS.findIndex((item, ind) => {
        if (el === item.value) index.push(ind);
      });
      defTypes = [...index.map((el: any) => FILTERS[el])];
    });
    return defTypes;
  };
  const currentEventTime = (dateData: [number, string]) => {
    const timeWithTimeZone = dateData.length ? getTimeFromString(dateData, newEvent.timeZone, timeZone) : null;
    return timeWithTimeZone;
  };
  const currentEventData = (dateData: [number, string]) => {
    const date = dateData.length ? getDateFromTimeStamp(dateData, newEvent.timeZone) : null;
    return date;
  };

  React.useEffect(() => {
    setNewEvent({ ...newEvent, timeZone: timeZoneHeader });
  }, []);
  return (
    <>
      <div className="wrapper-title">
        <Divider />
        <h1>{name}</h1>
        <div>
          {type &&
            defaultTypes().map((el: any) => {
              return (
                <Tag
                  key={el.value}
                  style={{ backgroundColor: typeColor[el.value].background, marginRight: 3 }}
                  color={typeColor[el.value].textColor}
                >
                  {el.text.toUpperCase()}
                </Tag>
              );
            })}
        </div>
      </div>
      <Divider />
      <div className="wrapper-content">
        <aside>
          <div className="wrapper-aside">
            <div css={timezoneswitch}>
              <label>Timezone</label>
              <Select
                css={timezoneSelect}
                placeholder="Please select a timezone"
                defaultValue={timeZoneHeader}
                onChange={newEventTimezoneHandler}
              >
                {timezoneOptions}
              </Select>
            </div>
            <div className="dates">
              <div className="date-title">Task start at:</div>
              <div className="date-description">
                <span className="start-date">{`${currentEventTime(newEvent.dateTime)}h ${currentEventData(
                  newEvent.dateTime
                )}`}</span>
              </div>
            </div>
            <div className="deadline">
              <div className="deadline-title">Deadline:</div>
              <div className="deadline-date">{`${currentEventTime(newEvent.deadline)}h ${currentEventData(
                newEvent.deadline
              )}`}</div>
            </div>
            <div className="wrapper-time-to-finish">
              <div className="time-to-finish-title">Needed time to finish:</div>
              <div className="time-to-finish">
                <img src="./assets/img/clock-circle.svg" alt="clock" />
                &nbsp;&nbsp;{' '}
                <span>
                  {timeToImplementation <= 1 ? `${timeToImplementation} hour` : `${timeToImplementation} hours`}
                </span>
              </div>
            </div>
            <p>
              This event will be <b>{isEventOnline ? 'Online' : 'Offline'}</b>
            </p>
            {!isEventOnline && (
              <>
                <h2>Location:</h2>
                <p>{place}</p>
              </>
            )}
          </div>
        </aside>
        <section className="description">
          <h2>Course: {courseName}</h2>
          <h2 css={marginTop}>Event link:</h2>
          <a className="description-link" href={descriptionUrl}>
            {descriptionUrl}
          </a>
          <h2 css={marginTop}>Event Description:</h2>
          <div css={marginTop}>{description}</div>
          <div className="links-wrapper">
            <h2 css={marginTop}>Materials:</h2>
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
          <h2 css={marginTop}>Result:</h2>
          <div>{result}</div>
          <h2 css={marginTop}>Comment:</h2>
          <div>{comment}</div>
          <div css={marginTop}>
            This event was prepared by <b>{trainee}</b>
          </div>
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
const timezoneswitch = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const timezoneSelect = css`
  width: 230px;
  margin-bottom: 10px;
`;

export default StudentModal;
