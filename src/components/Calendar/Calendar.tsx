import { Calendar, Tag, Select, Col, Row, Typography, Button, Space } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './Calendar.css';

const listData = [
  {
    id: 'KyvcYasdasdsadoYc',
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
    id: 'KyvcYfdhjasdasK4eoYc',
    name: 'HTML',
    description: 'Студент знакомится с HTML',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: ['link', 'info'],
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
  },
  {
    id: 'KyasdasdhjMuXQeK4eoYc',
    name: 'HTML',
    description: 'Студент знакомится с HTML',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: ['test', 'info'],
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
  },
  {
    id: 'KyvcYfdhjMuXQasdsadc',
    name: 'HTML',
    description: 'Студент знакомится с HTML',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: ['warmup', 'info'],
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
  },
  {
    id: 'KyvcYfasdffas4eoYc',
    name: 'HTML',
    description: 'Студент знакомится с HTML',
    descriptionUrl: 'https://guides.hexlet.io/markdown/',
    type: ['interview', 'info'],
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

function getItemData(value: { date: () => number; month: () => number }) {
  const data: any = [];
  const listData = getListData(value);
  listData.filter((item: { dateTime: string | number | Date }) => {
    let eventStart = new Date(item.dateTime);
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
        (item: {
          id: string;
          type: (string | undefined)[];
          descriptionUrl: string | undefined;
          description: React.ReactNode;
        }) => (
          <li key={item.id}>
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
                  headerRender={({ value, onChange }) => {
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
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Typography.Text strong style={{ margin: '0 1rem' }}>
                            {currentDate}
                          </Typography.Text>
                          <Row gutter={7}>
                            <Col>
                              <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                value={String(months[month])}
                                onChange={key => {
                                  const newValue = value.clone();
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
                      </div>
                    );
                  }}
                  onSelect={value => {
                    const listData = getItemData(value);
                    console.log(listData);
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
