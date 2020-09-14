import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'components/Calendar';

const CalendarPage: React.FC = () => {
  return (
    <div>
      {<Calendar />}
      <div>
        <Link to="/main">to Main</Link>
      </div>
    </div>
  );
};

export default CalendarPage;
