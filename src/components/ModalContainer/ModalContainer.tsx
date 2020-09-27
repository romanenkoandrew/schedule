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
  Result
} from 'antd';
import { css } from '@emotion/core';
import { WrapperModalMentor } from './WrapperModalMentor';
import { FILTERS } from 'constants/dataForTable';
import Loading from 'helpers/Loading';
import { Courses } from 'constants/header/header';
import StudentModal from './StudentModal';

export interface IModal {
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

const coursesOptions = Courses.map((i, idx) => (
  <Select.Option key={i} value={idx}>
    {i}
  </Select.Option>
));

const ModalContainer: React.FC<IModal> = props => {
  const {
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
      dateTime: 0,
      deadline: 0,
      place: '',
      comment: '',
      trainee: '',
      courseName: 'JS/Frontend 2020-Q3',
      timeToImplementation: 0,
      broadcastUrl: '',
      materialsLinks: [],
      result: '',
      feedBack: [],
      isFeedback: false,
      isEventOnline: true
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
  const newEventTimeHandler = (value: any) => {
    setNewEvent({ ...newEvent, timeToImplementation: value });
  };
  const newEventCourseNameHandler = (value: any) => {
    setNewEvent({ ...newEvent, courseName: Courses[value] });
  };
  const newEventTypeHandler = (value: any) => {
    setNewEvent({ ...newEvent, type: value });
  };
  const newEventTimeStartHandler = (value: any) => {
    // setNewEvent({...newEvent, type: value})
    console.log(moment(value).hour());
  };
  const newEventFeedbackHandler = (e: any) => {
    setNewEvent({ ...newEvent, isFeedback: e.target.checked });
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
  const resetEvent = () => {
    console.log('resetEvent:', newEvent);
  };
  const createOrUpdateEvent = () => {
    if (eventId === '') {
      addNewEvent(newEvent);
      closeModalHandler();
    } else {
      updateEvent(newEvent);
      setEditMode(false);
      // getEventById(eventId);
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
                <Tooltip placement="left" title="Reset" color={'red'}>
                  <button onClick={resetEvent} disabled={!editMode}>
                    <img src={editMode ? './assets/img/stop.svg' : './assets/img/stop-disabled.svg'} alt="decline" />
                  </button>
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
                      <div className="dates">
                        <div className="date-title">Task start:</div>
                        <div className="date-description">
                          <TimePicker
                            format={timeFormat}
                            placeholder="The task starts at"
                            style={{ marginBottom: '5px' }}
                            defaultValue={moment(newEvent.dateTime)}
                            onChange={newEventTimeStartHandler}
                          />
                          <DatePicker
                            format={dateFormat}
                            placeholder="The task starts on"
                            defaultValue={moment(newEvent.dateTime)}
                          />
                        </div>
                      </div>
                      <div className="deadline">
                        <div className="deadline-title">Deadline:</div>
                        <TimePicker
                          format={timeFormat}
                          placeholder="The task ends at"
                          style={{ marginBottom: '5px' }}
                          defaultValue={moment(newEvent.deadline)}
                        />
                        <DatePicker
                          format={dateFormat}
                          placeholder="The task ends on"
                          defaultValue={moment(newEvent.deadline)}
                        />
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
                      {!newEvent.isEventOnline && (
                        <>
                          <h4>Location:</h4>
                          <TextArea
                            id="place"
                            placeholder="City"
                            rows={1}
                            css={textAreaStyle}
                            defaultValue={newEvent.place}
                            onChange={newEventHandler}
                            autoFocus
                            required
                          />
                        </>
                      )}
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
                    <h2>Event link:</h2>
                    <TextArea
                      id="descriptionUrl"
                      placeholder="Link to event"
                      rows={1}
                      css={textAreaStyle}
                      defaultValue={newEvent.descriptionUrl}
                      onChange={newEventHandler}
                      required
                    />
                    <h2>Event Description:</h2>
                    <TextArea
                      id="description"
                      placeholder="Task description"
                      rows={3}
                      css={textAreaStyle}
                      defaultValue={newEvent.description}
                      onChange={newEventHandler}
                      required
                    />
                    <div className="links-wrapper">
                      <h2>Materials:</h2>
                      <TextArea
                        placeholder={`Each link on a new line: \nFirst link \nSecond link`}
                        rows={3}
                        css={textAreaStyle}
                        defaultValue={defaultMaterialLinks()}
                        onChange={materialsLinksHandler}
                        required
                      />
                    </div>
                    <h2>Result:</h2>
                    <TextArea
                      id="result"
                      placeholder="What knowledge the student will receive as a result"
                      rows={3}
                      css={textAreaStyle}
                      defaultValue={newEvent.result}
                      onChange={newEventHandler}
                      required
                    />
                    <h2>Comment:</h2>
                    <TextArea
                      id="comment"
                      placeholder="Extra comment from mentor"
                      rows={3}
                      css={textAreaStyle}
                      defaultValue={newEvent.comment}
                      onChange={newEventHandler}
                      required
                    />
                    <h2>Author:</h2>
                    <TextArea
                      id="trainee"
                      placeholder="Author name"
                      rows={1}
                      css={textAreaStyle}
                      defaultValue={newEvent.trainee}
                      onChange={newEventHandler}
                      required
                    />
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
  margin: 10px auto;
`;

export default ModalContainer;
