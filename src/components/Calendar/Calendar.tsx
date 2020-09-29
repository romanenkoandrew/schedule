import { Calendar, Tag, Select, Col, Row, Typography, Button, Drawer, message } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { IEvent } from '../../services/events-service';
import { TYPE_COLORS } from 'constants/globalConstants';
import { css } from '@emotion/core';
import moment from 'moment';
import Loading from 'helpers/Loading';

const getDateFromTimeStamp = (dateData: [number, string], timeZone: number) => {
  const timestamp = dateData[0];
  const [hours, minutes] = dateData[1].split(':');
  const options = {
    year: 'numeric',
    day: 'numeric',
    month: 'numeric'
  };
  const dateWithUserUTC =
    timestamp -
    -new Date().getTimezoneOffset() * 60000 +
    timeZone * 3600000 -
    new Date(timestamp).getHours() * 3600000 -
    new Date(timestamp).getMinutes() * 60000 -
    new Date(timestamp).getSeconds() * 1000 -
    new Date(timestamp).getMilliseconds() +
    +hours * 3600000 +
    +minutes * 60000;
  return new Date(dateWithUserUTC);
};

const CalendarApp: React.FC<any> = (props: any) => {
  const { getEvents, eventsData, loading, timeZone, typeColors, courses, error } = props;

  const [data, setData] = useState([]);
  const [isToday, setDisableBtn] = useState(true);
  const [visible, setVisibleView] = useState(false);
  const [currentValue, setValue] = useState(moment());

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    let newData: any = eventsData.map((item: any, idx: number) => {
      const key = item.id;
      return {
        ...item,
        key,
        timeToImplementation: `${item.timeToImplementation} h`
      };
    });

    const copy = newData.map((item: any, idx: number) => {
      const key = `${item.id}${idx}`;
      return {
        ...item,
        key,
        id: key,
        timeToImplementation: `${item.timeToImplementation} h`,
        dateTime: item.deadline,
        type: [...item.type, 'deadline']
      };
    });

    const result: any = [...newData, ...copy].sort((a: any, b: any) => a.dateTime[0] - b.dateTime[0]);
    setData(result);
  }, [eventsData]);

  useEffect(() => {
    let newData: IEvent[] = eventsData.map((item: IEvent, idx: number) => {
      const key = item.id;
      return {
        ...item,
        key,
        timeToImplementation: `${item.timeToImplementation} h`
      };
    });

    const copy = newData.map((item: IEvent, idx: number) => {
      const key = `${item.id}${idx}`;
      return {
        ...item,
        key,
        id: key,
        dateTime: item.deadline,
        type: ['deadline']
      };
    });

    const result: any = [...newData, ...copy].filter((event: any) => courses.includes(event.courseName));

    setData(result);
    console.log(result);
  }, [eventsData, courses]);

  const getListData = (value: { date: () => number; month: () => number }) => {
    const dataList: IEvent[] = [];
    data.map((item: IEvent) => {
      const dateItem: any = item.dateTime;
      let eventStart: any = getDateFromTimeStamp(dateItem, timeZone);
      if (eventStart.getUTCMonth() !== value.month()) {
        return;
      }
      if (eventStart.getUTCDate() === value.date()) {
        dataList.push(item);
      }
    });
    return dataList;
  };

  const showMessage = () => {
    if (loading) {
      return message.loading({ content: 'request...', key: 'updatable' });
    }
    if (!loading && error) {
      return message.error({ content: 'Bad Request!', key: 'updatable', duration: 2 });
    }
    if (!loading && !error) {
      return message.success({ content: 'Success!', key: 'updatable', duration: 2 });
    }
  };

  useEffect(() => {
    showMessage();
  }, [loading, error]);

  const isColor = (item: { type: string | any[] }) => {
    if (!item.type.length) {
      return 'orange';
    }
    const color: string = typeColors[item.type[0]].background;
    return color;
  };

  const getItemLabel = (item: {
    id?: string;
    name: any;
    type: any;
    descriptionUrl?: string | undefined;
    description?: string | undefined;
  }) => {
    if (item.type[0] === 'deadline') {
      return `Deadline ${item.name}`;
    }
    return `${item.name}`;
  };

  const dateCellRender = (value: { date: () => number; month: () => number }) => {
    const listData = getListData(value);
    return (
      <div>
        <ul css={events}>
          {listData.map(
            (item: {
              id: string;
              name: string;
              type: string[];
              descriptionUrl: string | undefined;
              description: string | undefined;
            }) => (
              <li key={item.id} title={item.description}>
                <Tag color={isColor(item)} style={{ width: '100%', border: '0px', color: typeColors[item.type[0]] }}>
                  {getItemLabel(item)}
                </Tag>
              </li>
            )
          )}
        </ul>
      </div>
    );
  };

  const getItemData = (value: { date: () => number; month: () => number }) => {
    const dayData: any = [];
    const listData = getListData(value);
    listData.filter((item: any) => {
      const dateItem: any = item.dateTime;
      let eventStart = getDateFromTimeStamp(dateItem, timeZone);
      if (eventStart.getUTCDate() === value.date()) {
        dayData.push(item);
      }
    });
    console.log(dayData);
    return dayData;
  };

  const RenderModalView = (props: { onClose: any; visible: any; title: string; value: any }) => {
    const { onClose, visible, title, value } = props;
    return (
      <div className="site-drawer-render-in-current-wrapper">
        <Drawer
          title={title}
          bodyStyle={{ padding: '15px' }}
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          getContainer={false}
          style={{
            position: 'absolute',
            overflow: 'hidden'
          }}
        >
          {itemDataRender(value)}
        </Drawer>
      </div>
    );
  };

  const itemDataRender = (value: { date: () => number; month: () => number }) => {
    const listData = getItemData(value);
    return (
      <ul css={eventsDayList}>
        {listData.map(
          (item: {
            id: string;
            name: string;
            type: (string | number)[];
            descriptionUrl: string | undefined;
            description: string | undefined;
            materialsLinks: (string | undefined)[];
          }) => (
            <li key={item.id} css={styleLi}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', overflow: 'hidden' }}>
                <Tag
                  color={typeColors[item.type[0]].background}
                  style={{ width: '100%', border: '0px', margin: '5px 0', color: typeColors[item.type[0]] }}
                >
                  {getItemLabel(item)}
                </Tag>
              </div>

              <div style={{ display: 'column' }}>
                <div>{item.description}</div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <a href={item.descriptionUrl} style={styles.styleA}>
                    More information
                  </a>
                  {item.materialsLinks.map((link, idx) => {
                    return (
                      <a href={item.materialsLinks[idx]} style={styles.styleA} key={item.id + `${idx}`}>
                        link {idx + 1}
                      </a>
                    );
                  })}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    );
  };

  if (loading && eventsData.length === 0) return <Loading />;

  return (
    <main>
      <section className="evnt-panel evnt-card-panel evnt-calendar-card">
        <div css={eventPanelWrapper}>
          <div className="evnt-calendar-table">
            <div className="evnt-calendar-container">
              {
                <Calendar
                  value={currentValue}
                  onSelect={value => {
                    getListData(value);
                    if (value.month() === currentValue.month()) {
                      const newValue = value.clone();
                      setValue(newValue);
                      setVisibleView(true);
                      return;
                    }
                    const newValue = value.clone();
                    setValue(newValue);
                    setDisableBtn(false);
                  }}
                  headerRender={({ value, onChange }) => {
                    const monthOptions = [];
                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    const month = value.month();

                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = 0; index < 12; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={months[index]} value={months[index]}>
                          {months[index]}
                        </Select.Option>
                      );
                    }

                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <Button
                            type="link"
                            icon={<LeftOutlined />}
                            onClick={() => {
                              const newValue = value.clone();
                              setValue(newValue);
                              setDisableBtn(false);
                              onChange(newValue.subtract(1, 'month'));
                            }}
                          ></Button>
                          <Button
                            type="link"
                            icon={<RightOutlined />}
                            onClick={() => {
                              const newValue = value.clone();
                              setValue(newValue);
                              setDisableBtn(false);
                              onChange(newValue.add(1, 'month'));
                            }}
                          ></Button>
                          <Button
                            type="text"
                            disabled={isToday}
                            onClick={() => {
                              let currentMonth = new Date().getMonth();
                              let currentYear = new Date().getFullYear();
                              const newValue = value.clone();
                              setValue(newValue);
                              onChange(newValue.month(currentMonth).year(currentYear));
                              setDisableBtn(true);
                            }}
                          >
                            Today
                          </Button>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginLeft: 'auto'
                          }}
                        >
                          <Typography.Text strong style={{ margin: '0 1rem' }}>
                            {currentValue.format('MMM YYYY')}
                          </Typography.Text>
                          <Row gutter={7}>
                            <Col>
                              <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                value={String(months[month])}
                                onChange={key => {
                                  const newValue = value.clone();
                                  setValue(newValue);
                                  setDisableBtn(false);
                                  newValue.month(key);
                                  onChange(newValue);
                                }}
                              >
                                {monthOptions}
                              </Select>
                            </Col>
                          </Row>
                        </div>
                        <RenderModalView
                          title={currentValue.format('dddd DD MMMM')}
                          value={value}
                          visible={visible}
                          onClose={() => {
                            setVisibleView(false);
                          }}
                        />
                      </div>
                    );
                  }}
                  dateCellRender={dateCellRender}
                />
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CalendarApp;

const styles = {
  styleA: {
    fontSize: '12px'
  },
  styleLi: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: '2px solid #494e5c10',
    color: '#5b5a59',
    padding: '5px 0',
    lineHeight: '18px'
  }
};

const eventPanelWrapper = css`
  position: relative;
  margin: 0 10px;
`;

const styleLi = css`
  display: column;
  justify-content: space-between;
  border-bottom: 1px solid #494e5c10;
  color: #5b5a59;
  padding: 5px 0;
  line-height: 18px;
`;

const events = css`
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style: none;
`;

const eventsDayList = css`
  height: 70px;
  margin: 0;
  padding: 0;
  list-style: none;
`;
