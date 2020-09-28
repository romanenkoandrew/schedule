import { Calendar, Tag, Select, Col, Row, Typography, Button, Drawer, Spin } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { IEvent } from '../../services/events-service';
import moment from 'moment';
import Loading from 'helpers/Loading';

const styles = {
  styleA: {
    padding: '0px 5px',
    fontSize: '12px'
  },
  styleLi: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: '1px solid #494e5c10',
    color: '#5b5a59',
    padding: '5px 0',
    lineHeight: '18px'
  }
};

const CalendarApp: React.FC<any> = (props: any) => {
  const { getEvents, eventsData, loading, timeZone } = props;

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
    console.log(result);
  }, [eventsData]);

  const getListData = (value: { date: () => number; month: () => number }) => {
    const dataList: IEvent[] = [];
    data.map((item: IEvent) => {
      const dateItem: any = item.dateTime[0];
      let eventStart: any = new Date(dateItem);
      if (eventStart.getUTCMonth() !== value.month()) {
        return;
      }
      if (eventStart.getUTCDate() === value.date()) {
        dataList.push(item);
      }
    });
    return dataList;
  };

  const dateCellRender = (value: { date: () => number; month: () => number }) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(
          (item: {
            id: string;
            name: string;
            type: (string | undefined)[];
            descriptionUrl: string | undefined;
            description: string | undefined;
          }) => (
            <li key={item.id} title={item.description}>
              <Tag className={item.type[0]}>
                <a href={item.descriptionUrl}>{`${item.name}, ${item.type[0]}`}</a>
              </Tag>
            </li>
          )
        )}
      </ul>
    );
  };

  const getItemData = (value: { date: () => number; month: () => number }) => {
    const dayData: any = [];
    const listData = getListData(value);
    listData.filter((item: any) => {
      let eventStart = new Date(item.dateTime[0]);
      if (eventStart.getUTCDate() === value.date()) {
        dayData.push(item);
      }
    });
    return dayData;
  };

  const RenderModalView = (props: { onClose: any; visible: any; title: string; value: any }) => {
    const { onClose, visible, title, value } = props;
    return (
      <div className="site-drawer-render-in-current-wrapper">
        <Drawer
          title={title}
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
    console.log(listData);
    return (
      <ul className="events">
        {listData.map(
          (item: {
            id: string;
            name: string;
            type: (string | undefined)[];
            descriptionUrl: string | undefined;
            description: string | undefined;
            materialsLinks: (string | undefined)[];
          }) => (
            <li key={item.id} style={styles.styleLi}>
              <div style={{ paddingRight: '10px', fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ display: 'column', justifyContent: 'space-around' }}>
                {item.description}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <a href={item.descriptionUrl} style={styles.styleA}>
                    More
                  </a>
                  <a href={item.materialsLinks[0]} style={styles.styleA}>
                    link 1
                  </a>
                  <a href={item.materialsLinks[1]} style={styles.styleA}>
                    link 2
                  </a>
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
        <div>
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
                              setDisableBtn(true);
                              let currentMonth = new Date().getMonth();
                              let currentYear = new Date().getFullYear();
                              const newValue = value.clone();
                              setValue(newValue);
                              onChange(newValue.month(currentMonth).year(currentYear));
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
