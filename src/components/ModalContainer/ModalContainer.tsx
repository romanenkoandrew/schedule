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
import { TYPES_WITH_COLORS, FILTERS } from 'constants/dataForTable';
import Loading from 'helpers/Loading';

export interface IModal {
  isStudent: boolean;
  isOpenModal: boolean;
  loading: boolean;
  closeModalHandler: () => void;
  getEventById: any;
  updateEvent: any;
  addNewEvent: any;
  eventId: string;
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
    feedback: string[];
    isEventOnline: boolean;
    [propName: string]: any;
  };
}

const timeFormat = 'HH:mm';
const dateFormat = 'DD.MM.YYYY';
const { TextArea } = Input;

const ModalContainer: React.FC<IModal> = props => {
  const {
    isStudent,
    eventId,
    isOpenModal,
    eventData,
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
    block,
    result,
    stack,
    feedback,
    isEventOnline,
    videoLink
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
    block: block,
    result: result,
    stack: stack,
    feedback: feedback,
    isEventOnline: isEventOnline,
    videoLink: videoLink
  });
  const defaultState = () => {
    setNewEvent({
      id: id || '',
      name: name || '',
      description: description || '',
      descriptionUrl: descriptionUrl || '',
      type: type || [],
      timeZone: timeZone || 0,
      dateTime: dateTime || 0,
      deadline: deadline || 0,
      place: place || '',
      comment: comment || '',
      trainee: trainee || '',
      courseName: courseName || '',
      timeToImplementation: timeToImplementation || 0,
      broadcastUrl: broadcastUrl || '',
      materialsLinks: materialsLinks || [],
      block: block || '',
      result: result || '',
      stack: stack || [],
      feedback: feedback || [],
      isEventOnline: isEventOnline || true,
      videoLink: videoLink || ''
    });
  };
  const editModeOn = () => {
    setEditMode(true);
    defaultState();
  };
  const tagRender = FILTERS.map(el => {
    return (
      <Select.Option value={el.text} key={el.text}>
        <Tag color={TYPES_WITH_COLORS[el.value]}>{el.text}</Tag>
      </Select.Option>
    );
  });

  const onCloseModal = () => {
    setEditMode(false);
    closeModalHandler();
    defaultState();
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
  const newEventTypeHandler = (value: any) => {
    setNewEvent({ ...newEvent, type: value });
  };
  const newEventTimeStartHandler = (value: any) => {
    // setNewEvent({...newEvent, type: value})
    console.log(moment(value).hour());
  };
  const defaultMaterialLinks = () => {
    if (materialsLinks) {
      const newArr = materialsLinks.toString().replace(/,/g, '\n');
      return newArr;
    }
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
    setNewEvent({
      ...newEvent,
      name: name
    });
  };
  const createOrUpdateEvent = () => {
    if (eventId === '') {
      addNewEvent(newEvent);
      closeModalHandler();
    } else {
      updateEvent(newEvent);
      getEventById(eventId);
      setEditMode(false);
    }
  };
  React.useEffect(() => {
    if (eventId === '') {
      defaultState();
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
                  <button onClick={editModeOn} disabled={editMode}>
                    <img src={editMode ? './assets/img/edit-disabled.svg' : './assets/img/edit.svg'} alt="edit" />
                  </button>
                </Tooltip>
                <Tooltip placement="left" title="Save" color={'green'}>
                  <button onClick={createOrUpdateEvent} disabled={!editMode}>
                    <img src={editMode ? './assets/img/check.svg' : './assets/img/check-disabled.svg'} alt="right" />
                  </button>
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
                  <TextArea
                    id="name"
                    placeholder="Сourse name"
                    rows={1}
                    style={{ width: '80%', margin: '10px auto' }}
                    defaultValue={name}
                    onChange={newEventHandler}
                    required
                  />
                  <div>
                    <label style={{ marginRight: '3px' }}>Event type:</label>
                    <Select
                      mode="multiple"
                      showArrow
                      dropdownMatchSelectWidth={150}
                      defaultValue={type}
                      // onChange={newEventTypeHandler}
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
                        <div className="date-title">Task start</div>
                        <div className="date-description">
                          <TimePicker
                            format={timeFormat}
                            placeholder="The task starts at"
                            style={{ marginBottom: '5px' }}
                            defaultValue={moment(dateTime)}
                            onChange={newEventTimeStartHandler}
                          />
                          <DatePicker
                            format={dateFormat}
                            placeholder="The task starts on"
                            defaultValue={moment(dateTime)}
                          />
                        </div>
                      </div>
                      <div className="deadline">
                        <div className="deadline-title">Deadline</div>
                        <TimePicker
                          format={timeFormat}
                          placeholder="The task ends at"
                          style={{ marginBottom: '5px' }}
                          defaultValue={moment(deadline)}
                        />
                        <DatePicker
                          format={dateFormat}
                          placeholder="The task ends on"
                          defaultValue={moment(deadline)}
                        />
                      </div>
                      <div className="wrapper-time-to-finish">
                        <div className="time-to-finish-title">Needed time to finish</div>
                        <div className="time-to-finish">
                          <InputNumber
                            min={0}
                            max={1000}
                            defaultValue={timeToImplementation}
                            onChange={newEventTimeHandler}
                            required
                          />
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
                    </div>
                  </aside>
                  <section className="description">
                    <h2>Description</h2>
                    <TextArea
                      id="descriptionUrl"
                      placeholder="Link to task"
                      rows={1}
                      style={{ width: '80%', margin: '10px auto' }}
                      defaultValue={descriptionUrl}
                      onChange={newEventHandler}
                      required
                    />
                    <TextArea
                      id="description"
                      placeholder="Task description"
                      rows={3}
                      style={{ width: '80%', margin: '10px auto' }}
                      defaultValue={description}
                      onChange={newEventHandler}
                      required
                    />
                    <div className="links-wrapper">
                      <h2>Materials:</h2>
                      <TextArea
                        placeholder={`Each link on a new line: \nFirst link \nSecond link`}
                        rows={3}
                        style={{ width: '80%', margin: '10px auto' }}
                        defaultValue={defaultMaterialLinks()}
                        onChange={materialsLinksHandler}
                        required
                      />
                    </div>
                    <TextArea
                      id="trainee"
                      placeholder="Autor name"
                      rows={1}
                      style={{ width: '80%', margin: '10px auto' }}
                      defaultValue={trainee}
                      onChange={newEventHandler}
                      required
                    />
                  </section>
                </div>
                <Divider />
                <div className="map-wrapper">
                  <Radio.Group onChange={isEventOnlineHandler} defaultValue={isEventOnline ? 'Online' : 'Offline'}>
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
                        style={{ width: '50%', margin: '10px auto' }}
                        defaultValue={place}
                        onChange={newEventHandler}
                        autoFocus
                        required
                      />
                      <div className="map"></div>
                    </>
                  )}
                </div>
              </>
            ) : (
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
                            {timeToImplementation <= 1
                              ? `${timeToImplementation} hour`
                              : `${timeToImplementation} hours`}
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
                    </div>
                  </aside>
                  <section className="description">
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
                  </section>
                </div>
                <Divider />
                <div className="map-wrapper">
                  <p>
                    This event will be <b>{isEventOnline ? 'Online' : 'Offline'}</b>
                  </p>
                  {!isEventOnline && (
                    <>
                      <h4>Location:</h4>
                      <p>{place}</p>
                      <div className="map"></div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </WrapperModalMentor>
      </Modal>
    </div>
  );
};

export default ModalContainer;
