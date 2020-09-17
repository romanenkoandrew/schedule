import React from 'react';
import { Link } from 'react-router-dom';
import CalendarApp from 'components/Calendar';

const CalendarPage: React.FC = () => {
  return (
    <div className="evnt-body-wrapper">
      <div className="evnt-main-container">
        {<CalendarApp />}
        <div>
          <Link to="/main">to Main</Link>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
