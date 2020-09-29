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
  Radio
} from 'antd';
import { css } from '@emotion/core';
import { WrapperModalMentor } from './WrapperModalMentor';
import { FILTERS } from 'constants/dataForTable';
import Loading from 'helpers/Loading';
import { Courses } from 'constants/header/header';
import StudentModal from './StudentModal';
import Timezones from 'constants/timezone/timezone';
import { getTimeFromString, getDateFromTimeStamp } from 'utils/utils';

export interface IModal {
  timeZoneHeader: number;
  isStudent: boolean;
  isOpenModal: boolean;
  loading: boolean;
  closeModalHandler: () => void;
  getEventById: any;
  updateEvent: any;
  addNewEvent: any;
  eventId: string;
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

const { TextArea } = Input;

const timezoneOptions = Timezones.map((i, idx) => (
  <Select.Option key={idx.toString()} value={i.value}>
    {i.name}
  </Select.Option>
));
const coursesOptions = Courses.map((i, idx) => (
  <Select.Option key={i} value={idx}>
    {i}
  </Select.Option>
));

const ModalContainer: React.FC<IModal> = props => {
  const {
    timeZoneHeader,
    isStudent,
    eventId,
    isOpenModal,
    eventData,
    typeColor,
    loading,
    closeModalHandler,
    getEventById,
    updateEvent,
    addNewEvent
  } = props;

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

  const [editMode, setEditMode] = React.useState(false);
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
  const defaultState = () => {
    setNewEvent({
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
  };
  const clearState = () => {
    setNewEvent({
      id: '',
      name: '',
      description: '',
      descriptionUrl: '',
      type: [],
      timeZone: 3,
      dateTime: [
        Number(moment().format('x')),
        moment()
          .format('HH:mm')
          .toString()
      ],
      deadline: [
        Number(moment().format('x')),
        moment()
          .format('HH:mm')
          .toString()
      ],
      place: '',
      comment: '',
      trainee: '',
      courseName: 'JS/Frontend 2020-Q3',
      timeToImplementation: 1,
      broadcastUrl: '',
      materialsLinks: [],
      result: '',
      feedBack: [],
      isFeedback: false,
      isEventOnline: false
    });
  };
  const editModeOn = () => {
    setEditMode(true);
    defaultState();
  };
  const tagRender = FILTERS.map(el => {
    return (
      <Select.Option value={el.value} key={el.value}>
        <Tag
          style={{ backgroundColor: typeColor[el.value].background, marginRight: 3 }}
          color={typeColor[el.value].textColor}
        >
          {el.text.toUpperCase()}
        </Tag>
      </Select.Option>
    );
  });

  const onCloseModal = () => {
    setEditMode(false);
    defaultState();
    closeModalHandler();
  };

  const newEventHandler = (e: any) => {
    setNewEvent({
      ...newEvent,
      [e.target.id]: e.target.value
    });
  };
  const newEventTimezoneHandler = (value: any) => {
    setNewEvent({ ...newEvent, timeZone: value });
  };
  const newEventTimeHandler = (value: any) => {
    setNewEvent({ ...newEvent, timeToImplementation: value });
  };
  const newEventCourseNameHandler = (value: any) => {
    setNewEvent({ ...newEvent, courseName: Courses[value] });
  };
  const newEventTypeHandler = (value: any) => {
    setNewEvent({ ...newEvent, type: value });
  };
  const newEventFeedbackHandler = (e: any) => {
    setNewEvent({ ...newEvent, isFeedback: e.target.checked });
  };
  const newEventChangeTimeStart = (moment: any, timeString: string) => {
    setNewEvent({
      ...newEvent,
      timeZone,
      dateTime: [newEvent.dateTime[0], timeString]
    });
  };
  const newEventChangeDeadline = (moment: any, timeString: string) => {
    setNewEvent({
      ...newEvent,
      timeZone,
      deadline: [newEvent.deadline[0], timeString]
    });
  };
  const newEventChangeDateStart = (moment: any, timeString: string) => {
    const date = new Date(moment);
    setNewEvent({
      ...newEvent,
      timeZone,
      dateTime: [date.getTime(), newEvent.dateTime[1]]
    });
  };
  const newEventChangeDateDeadline = (moment: any, timeString: string) => {
    const date = new Date(moment);
    setNewEvent({
      ...newEvent,
      timeZone,
      deadline: [date.getTime(), newEvent.dateTime[1]]
    });
  };
  const currentEventTimeStart = () => {
    if (newEvent.id) {
      const timeStartWithTimeZone = getTimeFromString(newEvent.dateTime, newEvent.timeZone, timeZone);
      return (
        <TimePicker
          value={moment(timeStartWithTimeZone, 'HH:mm')}
          format={'HH:mm'}
          onChange={(moment, dateString) => newEventChangeTimeStart(moment, dateString)}
        />
      );
    }
    return (
      <TimePicker format={'HH:mm'} onChange={(moment, dateString) => newEventChangeTimeStart(moment, dateString)} />
    );
  };
  const currentEventTimeDeadline = () => {
    if (newEvent.id) {
      const deadlineWithTimeZone = getTimeFromString(newEvent.deadline, newEvent.timeZone, timeZone);
      return (
        <TimePicker
          value={moment(deadlineWithTimeZone, 'HH:mm')}
          format={'HH:mm'}
          onChange={(moment, dateString) => newEventChangeDeadline(moment, dateString)}
        />
      );
    }
    return (
      <TimePicker format={'HH:mm'} onChange={(moment, dateString) => newEventChangeDeadline(moment, dateString)} />
    );
  };
  const currentEventDataStart = () => {
    if (newEvent.id) {
      const date = getDateFromTimeStamp(newEvent.dateTime, newEvent.timeZone);
      return (
        <DatePicker
          format={'DD/MM/YYYY'}
          defaultValue={moment(date, 'DD/MM/YYYY')}
          value={moment(date, 'DD/MM/YYYY')}
          onChange={(moment, dateString) => {
            newEventChangeDateStart(moment, dateString);
          }}
        />
      );
    }
    return (
      <DatePicker
        format={'DD/MM/YYYY'}
        onChange={(moment, dateString) => {
          newEventChangeDateStart(moment, dateString);
        }}
      />
    );
  };
  const currentEventDataDeadline = () => {
    if (newEvent.id) {
      const date = getDateFromTimeStamp(newEvent.deadline, newEvent.timeZone);
      return (
        <DatePicker
          format={'DD/MM/YYYY'}
          defaultValue={moment(date, 'DD/MM/YYYY')}
          value={moment(date, 'DD/MM/YYYY')}
          onChange={(moment, dateString) => {
            newEventChangeDateDeadline(moment, dateString);
          }}
        />
      );
    }
    return (
      <DatePicker
        format={'DD/MM/YYYY'}
        onChange={(moment, dateString) => {
          newEventChangeDateStart(moment, dateString);
        }}
      />
    );
  };
  const newFieldTextArea = (tagName: string, id: string, placeholder: string, rows: number, value: string) => {
    return (
      <>
        <h2>{tagName}:</h2>
        <TextArea
          id={id}
          placeholder={placeholder}
          rows={rows}
          css={textAreaStyle}
          defaultValue={value}
          onChange={newEventHandler}
        />
      </>
    );
  };
  const defaultMaterialLinks = () => {
    if (newEvent.materialsLinks) {
      const newArr = newEvent.materialsLinks.toString().replace(/,/g, '\n');
      return newArr;
    }
  };
  const defaultCourse: any = () => {
    const defCourse = Courses.findIndex(el => el === newEvent.courseName);
    return defCourse === -1 ? 0 : defCourse;
  };

  const materialsLinksHandler = (e: any) => {
    setNewEvent({ ...newEvent, materialsLinks: e.target.value.split('\n') });
  };
  const isEventOnlineHandler = (e: any) => {
    if (e.target.value === 'Online') {
      setNewEvent({ ...newEvent, isEventOnline: true });
    } else {
      setNewEvent({ ...newEvent, isEventOnline: false });
    }
  };
  const createOrUpdateEvent = () => {
    if (eventId === '') {
      addNewEvent(newEvent);
      closeModalHandler();
    } else {
      updateEvent(newEvent);
      setEditMode(false);
      closeModalHandler();
    }
  };
  React.useEffect(() => {
    if (!eventId) {
      clearState();
      setEditMode(true);
    } else {
      getEventById(eventId);
      defaultState();
    }
  }, []);
  React.useEffect(() => {
    if (eventId) {
      setNewEvent({ ...newEvent, timeZone: timeZoneHeader });
    }
  }, [editMode]);

  if (loading) return <Loading />;
  return (
    <div>
      <Modal style={{ top: 20 }} centered width={`90%`} visible={isOpenModal} footer={null} onCancel={onCloseModal}>
        <WrapperModalMentor>
          <div className="modal">
            {isStudent ? null : (
              <div className="panel-mentor-wrapper">
                <Tooltip placement="left" title="Edit" color={'cyan'}>
                  <Button onClick={editModeOn} disabled={editMode}>
                    <img src={editMode ? './assets/img/edit-disabled.svg' : './assets/img/edit.svg'} alt="edit" />
                  </Button>
                </Tooltip>
                <Tooltip placement="left" title="Save" color={'green'}>
                  <Button disabled={!editMode} onClick={createOrUpdateEvent}>
                    <img src={editMode ? './assets/img/check.svg' : './assets/img/check-disabled.svg'} alt="right" />
                  </Button>
                </Tooltip>
              </div>
            )}
            {editMode ? (
              <>
                <div className="wrapper-title">
                  <Divider />
                  <h2>Event name:</h2>
                  <TextArea
                    id="name"
                    placeholder="Сourse name"
                    rows={1}
                    style={{ width: '80%', margin: '10px auto' }}
                    defaultValue={newEvent.name}
                    onChange={newEventHandler}
                  />
                  <div>
                    <label style={{ marginRight: '3px' }}>
                      <b>Event type:</b>
                    </label>
                    <Select
                      mode="multiple"
                      showArrow
                      dropdownMatchSelectWidth={150}
                      defaultValue={newEvent.type}
                      onChange={newEventTypeHandler}
                    >
                      {tagRender}
                    </Select>
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
                        <div className="date-title">Task start:</div>
                        <div className="date-description">
                          {currentEventTimeStart()}
                          {currentEventDataStart()}
                        </div>
                      </div>
                      <div className="deadline">
                        <div className="deadline-title">Deadline:</div>
                        {currentEventTimeDeadline()}
                        {currentEventDataDeadline()}
                      </div>
                      <div className="wrapper-time-to-finish">
                        <div className="time-to-finish-title">Needed time to finish:</div>
                        <div className="time-to-finish">
                          <InputNumber
                            min={0}
                            max={1000}
                            defaultValue={newEvent.timeToImplementation}
                            onChange={newEventTimeHandler}
                            required
                          />
                        </div>
                      </div>
                      <Radio.Group
                        style={{ margin: '5px 0' }}
                        onChange={isEventOnlineHandler}
                        defaultValue={newEvent.isEventOnline ? 'Online' : 'Offline'}
                      >
                        <Radio value={'Online'}>Online</Radio>
                        <Radio value={'Offline'}>Offline</Radio>
                      </Radio.Group>
                      {!newEvent.isEventOnline && newFieldTextArea('Location', 'place', 'City', 1, newEvent.place)}
                    </div>
                  </aside>
                  <section className="description">
                    <div css={courseswitch}>
                      <label>
                        <b>Course:</b>
                      </label>
                      <Select defaultValue={defaultCourse} css={coursesSelect} onChange={newEventCourseNameHandler}>
                        {coursesOptions}
                      </Select>
                    </div>
                    {newFieldTextArea('Event link', 'descriptionUrl', 'Link to event', 1, newEvent.descriptionUrl)}
                    {newFieldTextArea(
                      'Youtube link',
                      'broadcastUrl',
                      'Event link to youtube',
                      1,
                      newEvent.broadcastUrl
                    )}
                    {newFieldTextArea('Event Description', 'description', 'Event description', 3, newEvent.description)}
                    <div className="links-wrapper">
                      <h2>Materials:</h2>
                      <TextArea
                        placeholder={`Each link on a new line: \nFirst link \nSecond link`}
                        rows={3}
                        css={textAreaStyle}
                        defaultValue={defaultMaterialLinks()}
                        onChange={materialsLinksHandler}
                      />
                    </div>
                    {newFieldTextArea(
                      'Result',
                      'result',
                      'What knowledge the student will receive as a result',
                      3,
                      newEvent.result
                    )}
                    {newFieldTextArea('Comment', 'comment', 'Extra comment from mentor', 3, newEvent.comment)}
                    {newFieldTextArea('Author', 'trainee', 'Author name', 1, newEvent.trainee)}
                    <Checkbox onChange={newEventFeedbackHandler} defaultChecked={newEvent.isFeedback}>
                      Can a student leave a feedback?
                    </Checkbox>
                  </section>
                </div>
                <Divider />
              </>
            ) : (
              <StudentModal
                eventData={eventData}
                updateEvent={updateEvent}
                isStudent={isStudent}
                typeColor={typeColor}
                timeZoneHeader={timeZoneHeader}
              />
            )}
          </div>
        </WrapperModalMentor>
      </Modal>
    </div>
  );
};

const courseswitch = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const coursesSelect = css`
  width: 200px;
  margin-bottom: 10px;
`;

const textAreaStyle = css`
  width: 90%;
  margin-bottom: 10px;
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

export default ModalContainer;
