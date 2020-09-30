import React from 'react';
import { Switch, Select, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ScheduleOutlined, DatabaseOutlined, ProfileOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { css } from '@emotion/core';
import ModalContainer from 'components/ModalContainer';
import Timezones from 'constants/timezone/timezone';
import { Courses, Layouts } from 'constants/header/header';
import Routes from 'constants/routes';

const logoSrc = 'assets/img/rsschool-logo.jpg';
const avatarSrc = 'assets/img/user.jpg';

const header = css`
  width: 100%;
  padding: 10px 40px 0 40px;
  padding-top: 10px;
  @media only screen and (max-width: 600px) {
    padding: 10px 10px 0 10px;
  }
`;

const topLine = css`
  display: flex;
  justify-content: space-between;
`;

const logo = css`
  margin-bottom: 20px;
  @media only screen and (max-width: 600px) {
    width: 100px;
    height: 40px;
  }
`;

const scheduleLayout = css`
  display: flex;
  justify-content: flex-start;
`;

const btnicon = css`
  font-size: 24px;
  color: #000;
  margin-right: 10px;
  &last-child {
    margin-right: 0;
  }
`;

const btniconactive = css`
  font-size: 24px;
  color: #1890ff;
  margin-right: 10px;
  &last-child {
    margin-right: 0;
  }
`;

const H1 = css`
  color: #1890ff;
  text-align: center;
`;

const switchandprofile = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: flex-end;
  }
`;

const switchMentor = css`
  margin: 0 15px;
  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
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
  @media only screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const avatarSize = css`
  width: 40px;
  height: 40px;
`;

const middleline = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const courseswitch = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const coursesSelect = css`
  width: 300px;
  margin-bottom: 10px;
`;

const timezoneswitch = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const timezoneSelect = css`
  width: 300px;
  margin-bottom: 10px;
`;

const btn = css`
  width: 40px;
  height: 40px;
`;

const btniconbig = css`
  font-size: 40px;
  color: #1890ff;
`;

const timezoneOptions = Timezones.map((i, idx) => (
  <Select.Option key={idx.toString()} value={i.value}>
    {i.name}
  </Select.Option>
));
const coursesOptions = Courses.map((i, idx) => (
  <Select.Option key={i} value={i}>
    {i}
  </Select.Option>
));
const color = '#1890FF';

interface IHeader {
  isStudent: boolean;
  timezone: number;
  courses: string[];
  layout: number;
  switchMentorStudent: any;
  switchLayout: any;
  changeTimezone: any;
  changeCourse: any;
}

const Header: React.FC<IHeader> = props => {
  const {
    isStudent,
    layout,
    timezone,
    courses,
    switchMentorStudent,
    switchLayout,
    changeTimezone,
    changeCourse
  } = props;

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const closeModalHandler = () => {
    setIsOpenModal(false);
  };
  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const handleSwitch = () => {
    switchMentorStudent({ switchMentorStudent: isStudent });
  };

  const handleSwitchlayout = (evt: any) => {
    let value;
    const elem = evt.currentTarget;
    const data = elem.dataset.layout;
    switch (data) {
      case 'calendar':
        value = Layouts.Calendar;
        break;
      case 'table':
        value = Layouts.Table;
        break;
      case 'list':
        value = Layouts.List;
        break;
      default:
        value = Layouts.Table;
    }
    switchLayout({ switchLayout: value });
  };

  const handleChangeTimezone = (evt: any) => {
    changeTimezone({ changeTimezone: evt });
  };

  const handleChangeCourse = (evt: any) => {
    changeCourse({ changeCourse: evt });
  };

  return (
    <header css={header}>
      <div css={topLine}>
        <img css={logo} src={logoSrc} alt="logo" />
        <div css={switchandprofile}>
          <div>
            <span>Mentor</span>
            <Switch css={switchMentor} defaultChecked={isStudent} onChange={handleSwitch} />
            <span>Student</span>
          </div>
          <div css={profile}>
            <img css={avatarSize} src={avatarSrc} alt="avatar" />
            <span>My Profile</span>
          </div>
        </div>
      </div>

      <h1 css={H1}>Schedule</h1>

      <div css={middleline}>
        <nav css={scheduleLayout}>
          <Tooltip title="Calendar" placement="bottom" color={color}>
            <Link to={Routes.Calendar} onClick={handleSwitchlayout} data-layout="calendar">
              <ScheduleOutlined css={layout === Layouts.Calendar ? btniconactive : btnicon} />
            </Link>
          </Tooltip>
          <Tooltip title="Table" placement="bottom" color={color}>
            <Link to={Routes.Main} onClick={handleSwitchlayout} data-layout="table">
              <DatabaseOutlined css={layout === Layouts.Table ? btniconactive : btnicon} />
            </Link>
          </Tooltip>
          <Tooltip title="List" placement="bottom" color={color}>
            <Link to={Routes.List} onClick={handleSwitchlayout} data-layout="list">
              <ProfileOutlined css={layout === Layouts.List ? btniconactive : btnicon} />
            </Link>
          </Tooltip>
        </nav>
        {!isStudent ? (
          <Tooltip title="Add event" placement="bottom" color={color}>
            <Button
              css={btn}
              shape="circle"
              icon={<PlusCircleOutlined css={btniconbig} />}
              onClick={openModalHandler}
            ></Button>
          </Tooltip>
        ) : null}
      </div>

      <div css={courseswitch}>
        <label>Course</label>
        <Select mode="multiple" defaultValue={courses} css={coursesSelect} onChange={handleChangeCourse}>
          {coursesOptions}
        </Select>
      </div>

      <div css={timezoneswitch}>
        <label>Timezone</label>
        <Select
          css={timezoneSelect}
          placeholder="Please select a timezone"
          defaultValue={timezone}
          onChange={handleChangeTimezone}
        >
          {timezoneOptions}
        </Select>
      </div>
      {isOpenModal && <ModalContainer eventId={''} isOpenModal={isOpenModal} closeModalHandler={closeModalHandler} />}
    </header>
  );
};

export default Header;
