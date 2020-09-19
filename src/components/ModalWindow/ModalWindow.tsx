import React from 'react';
import moment from 'moment';
import { IModal } from 'components/ModalContainer/ModalContainer';
import { WrapperModalMentor } from './WrapperModalMentor';
import { Divider, Tag } from 'antd';
import { TYPES_WITH_COLORS } from 'constants/dataForTable';

const ModalWindow: React.FC<IModal> = props => {
  const { isStudent } = props;
  const {
    name,
    trainee,
    type,
    description,
    descriptionUrl,
    timeToImplementation,
    materialsLinks,
    stack,
    place,
    taskBreakpoints
  } = props.testData;
  return (
    <WrapperModalMentor>
      <div className="modal">
        {isStudent ? null : (
          <div className="panel-mentor-wrapper">
            <button>
              <img src="./assets/img/edit.svg" alt="edit" />
            </button>
            <button>
              <img src="./assets/img/check.svg" alt="right" />
            </button>
            <button>
              <img src="./assets/img/stop.svg" alt="decline" />
            </button>
          </div>
        )}
        <div className="wrapper-title">
          <Divider />
          <h1>{name}</h1>
          {type.map(el => {
            return (
              <Tag key={el} color={TYPES_WITH_COLORS[el]}>
                {el}
              </Tag>
            );
          })}
        </div>
        <Divider />
        <div className="wrapper-content">
          <aside>
            <div className="wrapper-aside">
              <div className="dates">
                <div className="date-title">Task dates</div>
                <div className="date-description">
                  <span className="start-date">{moment(taskBreakpoints[0]).format('DD.MM.YYYY')}</span>-
                  <span className="end-date">{moment(taskBreakpoints[1]).format('DD.MM.YYYY')}</span>
                </div>
              </div>
              <div className="deadline">
                <div className="deadline-title">Deadline</div>
                <div className="deadline-date">{moment(taskBreakpoints[1]).format('DD.MM.YYYY')}</div>
              </div>
              <div className="wrapper-time-to-finish">
                <div className="time-to-finish-title">Needed time to finish</div>
                <div className="time-to-finish">
                  <img src="./assets/img/clock-circle.svg" alt="clock" />
                  &nbsp;&nbsp;{' '}
                  <span>
                    {timeToImplementation === 1 ? `${timeToImplementation} hour` : `${timeToImplementation} hours`}
                  </span>
                </div>
              </div>
              <div className="stack">
                <div className="stack-title">Stack</div>
                <ul>
                  {stack.map(el => {
                    return <li key={el}>{el}</li>;
                  })}
                </ul>
              </div>
            </div>
          </aside>
          <section className="description">
            <h2>Description</h2>
            <a className="description-link" href={descriptionUrl}>
              {descriptionUrl}
            </a>
            <p>{description}</p>
            <div className="links-wrapper">
              <h2>Materials:</h2>
              <ul>
                {materialsLinks.map(el => {
                  return (
                    <li key={el}>
                      <a href={el}>{el}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              This event was prepared by <b>{trainee}</b>
            </div>
          </section>
        </div>
        <Divider />
        <div className="map-wrapper">
          <h4>Place to meet</h4>
          <p>{place}</p>
          <div className="map"></div>
        </div>
      </div>
    </WrapperModalMentor>
  );
};

export default ModalWindow;
