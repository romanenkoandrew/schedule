import React from 'react';
import { Link } from 'react-router-dom';
import CalendarApp from 'components/Calendar';
import BugCatcher from 'components/bug-catcher';

const CalendarPage: React.FC = () => {
  return (
    <div className="evnt-body-wrapper">
      <BugCatcher>
        <div className="evnt-main-container">
          {<CalendarApp />}
          <div>
            <Link to="/main">to Main</Link>
          </div>
        </div>
      </BugCatcher>
    </div>
  );
};

export default CalendarPage;
