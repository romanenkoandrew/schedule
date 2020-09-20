import { Calendar, PageHeader, Tag, Select, Radio, Col, Row, Typography, Button, Space } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import './Calendar.css';

const listData = [
  {
    id: 'KyvcYfdhjMuXQeK4eoYc',
    name: 'HTML',
    description: 'Студент знакомится с HTML',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: ['htmlTask', 'info'],
    timeZone: 3,
    dateTime: 1600291763391,
    place: 'class',
    comment: 'Создан и размещён на gh - pages файл HTML',
    trainee: 'Сергей Шаляпин',
    courseName: 'jsFrontEnd',
    timeToImplementation: 4,
    broadcastUrl: 'Link on Video',
    materialsLinks: ['https: // github.com/rolling-scopes-school/tasks/blob/master/tasks/codewars-stage-1.md', 'link2'],
    block: 'HTML',
    result: 'Студент знает HTML',
    stack: ['HTML', 'CSS', 'Markdown'],
    feedBack: 'Cool',
    taskBreakpoints: [1600291763391, 1600291764391],
    videoLink: 'string'
  },
  {
    id: 'KyvcYfdhjMuXQeK4eoYc',
    name: 'HTML',
    description: 'Студент знакомится с HTML',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: ['deadline', 'info'],
    timeZone: 3,
    dateTime: 1600391764391,
    place: 'class',
    comment: 'Создан и размещён на gh - pages файл HTML',
    trainee: 'Сергей Шаляпин',
    courseName: 'jsFrontEnd',
    timeToImplementation: 4,
    broadcastUrl: 'Link on Video',
    materialsLinks: ['https: // github.com/rolling-scopes-school/tasks/blob/master/tasks/codewars-stage-1.md', 'link2'],
    block: 'HTML',
    result: 'Студент знает HTML',
    stack: ['HTML', 'CSS', 'Markdown'],
    feedBack: 'Cool',
    taskBreakpoints: [1600291763391, 1600291764391],
    videoLink: 'string'
  }
];

function getListData(value: { date: () => number; month: () => number }) {
  const data: any = [];
  listData.map(item => {
    let eventStart = new Date(item.dateTime);
    if (eventStart.getUTCMonth() !== value.month()) {
      return;
    }
    if (eventStart.getUTCDay() === value.date()) {
      data.push(item);
    }
  });
  return data;
}

function dateCellRender(value: { date: () => number; month: () => number }) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(
        (item: { type: (string | undefined)[]; descriptionUrl: string | undefined; description: React.ReactNode }) => (
          <li key={item.type[0]}>
            <Tag className={item.type[0]}>
              <a href={item.descriptionUrl}>{item.description}</a>
            </Tag>
          </li>
        )
      )}
    </ul>
  );
}

function getMonthData(value: { month: () => number }) {
  if (value.month() === 8) {
    return 1394;
  }
}

function monthCellRender(value: any) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
}

function onPanelChange(value: any, mode: any) {
  console.log(value, mode);
}

const CalendarApp: React.FC<any> = () => {
  const [isToday, setDisableBtn] = useState(true);
  return (
    <main>
      <section className="evnt-panel evnt-card-panel evnt-calendar-card">
        <div className="evnt-panel-wrapper">
          <div className="evnt-calendar-table">
            <div className="evnt-calendar-container">
              {
                <Calendar
                  headerRender={({ value, type, onChange, onTypeChange }) => {
                    const monthOptions = [];
                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    const month = value.month();
                    const currentDate = value.format('MMM YYYY');

                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = 0; index < 12; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={index} value={months[index]}>
                          {months[index]}
                        </Select.Option>
                      );
                    }

                    return (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignContent: 'centre'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent: 'centre'
                          }}
                        >
                          <Button
                            type="link"
                            icon={<LeftOutlined />}
                            onClick={() => {
                              const newValue = value.clone();
                              setDisableBtn(false);
                              onChange(newValue.subtract(1, 'month'));
                            }}
                          ></Button>
                          <Button
                            type="link"
                            icon={<RightOutlined />}
                            onClick={() => {
                              const newValue = value.clone();
                              setDisableBtn(false);
                              onChange(newValue.add(1, 'month'));
                            }}
                          ></Button>
                          <Typography.Title level={3}>{currentDate}</Typography.Title>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignContent: 'centre'
                          }}
                        >
                          <Button
                            type="text"
                            disabled={isToday}
                            onClick={() => {
                              setDisableBtn(true);
                              let currentMonth = new Date().getMonth();
                              const newValue = value.clone();
                              onChange(newValue.month(currentMonth));
                            }}
                          >
                            Today
                          </Button>
                          <Row gutter={7}>
                            <Col>
                              <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                value={String(months[month])}
                                onChange={key => {
                                  const newValue = value.clone();
                                  newValue.month(key);
                                  onChange(newValue);
                                }}
                              >
                                {monthOptions}
                              </Select>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    );
                  }}
                  dateCellRender={dateCellRender}
                  monthCellRender={monthCellRender}
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
