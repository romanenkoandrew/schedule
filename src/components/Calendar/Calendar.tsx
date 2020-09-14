import React from 'react';
import { ActionType, ActionTypeProps } from 'types';

import './Calendar.css';

interface ITestComponent {
  score: number;
  data: {};
  increment: ActionTypeProps;
  decrement: ActionTypeProps;
  reset: ActionTypeProps;
  getData: ActionType;
}

const Calendar: React.FC<ITestComponent> = props => {
  const { score, data, increment, decrement, reset, getData } = props;

  const months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const today = new Date();

  const year = today.getFullYear();

  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const generateMatrix = () => {
    const matrixMonth: Array<any> = [];
    let maxDays = nDays[month];

    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    let counter = 1;
    for (let row = 1; row < 6; row++) {
      matrixMonth[row] = [];
      for (let col = 0; col < 7; col++) {
        matrixMonth[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          matrixMonth[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrixMonth[row][col] = counter++;
        }
      }
    }

    return matrixMonth;
  };

  const matrix = generateMatrix();

  let rows = [];
  rows = matrix.map(row => {
    const rowItems = row.map((item: any) => {
      return (
        <td className="calendar-day">
          <span>{item}</span>
        </td>
      );
    });
    return <tr className="">{rowItems}</tr>;
  });

  return (
    <div className="container">
      <div className="fc-toolbar fc-header-toolbar">
        <div className="fc-left">
          <h2>Sep 2020</h2>
          <div className="btn-group">
            <button className="fc-prev-button btn btn-primary">
              <span className="fa fa-chevron-left"></span>
            </button>
            <button className="fc-next-button btn btn-primary">
              <span className="fa fa-chevron-right"></span>
            </button>
          </div>
          <button className="fc-today-button btn btn-primary disabled">Today</button>
        </div>

        <div className="float-right">
          <div className="btn-group">
            <button className="fc-month-button btn btn-primary active">Month</button>
            <button className="fc-next-button btn btn-primary">Week</button>
            <button className="fc-next-button btn btn-primary">Day</button>
          </div>
        </div>
      </div>

      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th className="col fc-mon">
                <span>Mon</span>
              </th>
              <th className="col fc-tue">
                <span>Tue</span>
              </th>
              <th className="col fc-wed">
                <span>Wed</span>
              </th>
              <th className="col fc-thu">
                <span>Thu</span>
              </th>
              <th className="col fc-fri">
                <span>Fri</span>
              </th>
              <th className="col fc-sat">
                <span>Sat</span>
              </th>
              <th className="col fc-sun">
                <span>Sun</span>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
