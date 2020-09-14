import React from 'react';
import { Button, Switch, Select } from 'antd';
import { ScheduleOutlined, DatabaseOutlined, ProfileOutlined } from '@ant-design/icons';

import { css } from '@emotion/core';

import Timezones from 'constants/timezone/timezone';

const logoSrc = require('../../assets/img/rsschool-logo.jpg');
const avatarSrc = require('../../assets/img/user.jpg');

const { Option } = Select;

const header = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 0 40px
`;

const leftHeader = css`
  display: flex;
  flex-direction: column;
`;

const logo = css`
  margin-bottom: 50px;
`;

const scheduleLayout = css`
  display: flex;
  justify-content: flex-start;
`;

const btn = css`
  width: 30px;
  height: 30px;
  margin-right: 5px;
  font-size: 24px;
  border: none;
`;

const btnicon = css`
  font-size: 24px;
`;

const middleHeader = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const rightHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const switchMentor = css`
  margin: 0 15px;
`;

const profile = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px dashed #aaa;
  margin-left: 20px;
  border-radius: 7px;
  width: 150px;
  height: 50px;
`;  

const avatarSize = css`
  width: 40px;
  height: 40px;
`;

const options = Timezones.map((i) => <option key={i.name} value={i.value}>{i.name}</option>);

interface IHeader {
  isMentor: boolean;
//  scheduleLayout: any;
//  timezone: number;
  switchMentorStudent: any;
}

const Header: React.FC<IHeader> = props => {
  const { isMentor, switchMentorStudent } = props;

  const handleClickCalendar = () => {
//    increment({ increment: score });
  };

  const handleClickTable = () => {

  };

  const handleClickList = () => {

  };

  const handleSwitch = () => {
    switchMentorStudent({ switchMentorStudent: isMentor });
  };

  const handleChangeTimezone = () => {

  };

  const handleChangeCourse = () => {

  };

  return (
    <header css={header}>
      <div css={leftHeader} >
        <img css={logo} src={logoSrc} alt="logo" />
        <div css={scheduleLayout}>
          <Button css={btn} icon={<ScheduleOutlined css={btnicon} />} onClick={handleClickCalendar}></Button>
          <Button css={btn} icon={<DatabaseOutlined css={btnicon} />} onClick={handleClickTable}></Button>
          <Button css={btn} icon={<ProfileOutlined css={btnicon} />} onClick={handleClickList}></Button>
        </div>
      </div>

      <div css={middleHeader} >
        <h1>Schedule</h1>
        <label>Course</label>
        <Select id="CoursesId" defaultValue="JS/Frontend" style={{ width: 200 }} onChange={handleChangeCourse}>
          <Option value="JS/Frontend 2020-Q3">JS/Frontend</Option>
          <Option value="React 2020-Q3">React 2020-Q3</Option>
          <Option value="Node 2020-Q3">Node 2020-Q3</Option>
        </Select>
        <label>Timezone</label>
        <Select id="TimezonesId" listHeight={200} defaultValue={2} style={{ width: 200 }} onChange={handleChangeTimezone}>
          {options}
        </Select>
      </div>

      <div css={rightHeader}>
        <div>
          <span>Mentor</span>
          <Switch css={switchMentor} defaultChecked={isMentor} onChange={handleSwitch} />
          <span>Student</span>
        </div>
        <div css={profile}>
          <img css={avatarSize} src={avatarSrc} alt="avatar" />
          <span>My Profile</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
