import React from 'react';
import ScheduleList from 'components/schedule-list';
import BugCatcher from 'components/bug-catcher';

const List: React.FC = () => {
  return (
    <div>
      <BugCatcher>
        <ScheduleList />
      </BugCatcher>
    </div>
  );
};

export default List;
