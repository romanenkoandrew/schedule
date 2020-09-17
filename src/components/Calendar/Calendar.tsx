import React, { useState, useEffect } from 'react';
import { Calendar, Tag } from 'antd';

import './Calendar.css';
import 'antd/dist/antd.css';

function getListData(value: { date: () => any }) {
  let listData;
  console.log(value.date());
  console.log(value.date());
  switch (value.date()) {
    case 8:
      listData = [
        {
          date: '',
          time: '',
          type: 'task',
          content: 'Codewars stage#1',
          link: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codewars-stage-1.md',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'test',
          content: 'Тест как учиться в RSSchool',
          link: 'Тест по основам Git. Ссылка будет в Discord. Его необходимо пройти за 24 часа',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'education',
          content: 'JavaScript Intro',
          link: 'https://www.youtube.com/watch?v=cP08joG36F0',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        }
      ];
      break;
    case 10:
      listData = [
        {
          date: '',
          time: '',
          type: 'task',
          content: 'Codewars stage#1',
          link: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codewars-stage-1.md',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'test',
          content: 'Тест как учиться в RSSchool',
          link: 'Тест по основам Git. Ссылка будет в Discord. Его необходимо пройти за 24 часа',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'education',
          content: 'JavaScript Intro',
          link: 'https://www.youtube.com/watch?v=cP08joG36F0',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        }
      ];
      break;
    case 15:
      listData = [
        {
          date: '',
          time: '',
          type: 'task',
          content: 'Codewars stage#1',
          link: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/codewars-stage-1.md',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'test',
          content: 'Тест как учиться в RSSchool',
          link: 'Тест по основам Git. Ссылка будет в Discord. Его необходимо пройти за 24 часа',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'education',
          content: 'JavaScript Intro',
          link: 'https://www.youtube.com/watch?v=cP08joG36F0',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        },
        {
          date: '',
          time: '',
          type: 'live',
          content: 'Git Basics. Live coding',
          link: 'Ответы на вопросы по алгоритмическим заданиям Stage#1',
          timeLong: '',
          teacher: ''
        }
      ];
    default:
  }
  return listData || [];
}

function dateCellRender(value: { date: () => any }) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.type}>
          <Tag className={item.type}>
            <a href={item.link}>{item.content}</a>
          </Tag>
        </li>
      ))}
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
  return (
    <main>
      <section className="evnt-panel evnt-card-panel evnt-calendar-card">
        <div className="evnt-panel-wrapper">
          <div className="evnt-calendar-table">
            <div className="evnt-calendar-container">
              {<Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CalendarApp;
