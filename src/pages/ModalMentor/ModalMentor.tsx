import React from 'react';
import { WrapperModalMentor } from './WrapperModalMentor';

const ModalMentor: React.FC = () => {
  return (
    <WrapperModalMentor>
      <div className="modal">
        {/* <button type="button" className="close">
          <img src="./assets/img/close.svg" alt="close" />
        </button> */}
        <div className="panel-mentor-wrapper">
          <button>
            <a href="">
              <img src="./assets/img/edit.svg" alt="edit" />
            </a>
          </button>
          <button>
            <a href="">
              <img src="./assets/img/check.svg" alt="right" />
            </a>
          </button>
          <button>
            <a href="">
              <img src="./assets/img/stop.svg" alt="decline" />
            </a>
          </button>
        </div>
        <div className="wrapper-title">
          <h1>Task name</h1>
          <span className="task">
            <img src="./assets/img/task.svg" alt="" />
          </span>
          <span className="self-ed">
            <img src="./assets/img/self-ed.svg" alt="" />
          </span>
        </div>
        <div className="wrapper-content">
          <aside>
            <div className="wrapper-aside">
              <div className="dates">
                <div className="date-title">Task dates</div>
                <div className="date-description">
                  <span className="start-date">01.10.2020</span>-<span className="end-date">12.10.2020</span>
                </div>
              </div>
              <div className="deadline">
                <div className="deadline-title">Deadline</div>
                <div className="deadline-date">12.10.2020</div>
              </div>
              <div className="wrapper-time-to-finish">
                <div className="time-to-finish-title">Needed time to finish</div>
                <div className="time-to-finish">
                  <img src="./assets/img/clock-circle.svg" alt="clock" />
                  &nbsp;&nbsp; <span>40 hours</span>
                </div>
              </div>
              <div className="stack">
                <div className="stack-title">Stack</div>
                <ul>
                  <li>Product Design</li>
                  <li>User Interface</li>
                  <li>User Experience</li>
                  <li>Interaction Design</li>
                  <li>Wireframing</li>
                  <li>Rapid Prototyping</li>
                  <li>Design Research</li>
                </ul>
              </div>
            </div>
          </aside>
          <section className="description">
            <h2>Description</h2>
            <a className="description-link" href="">
              link to task or github
            </a>
            <p>
              Maui hotel or Maui condo? It’s the burning question on everyones mind! What should you do? Maui hotel?
              Maui condo? Which should you choose? The sweat is pouring down your face and you can feel the pressure
              building…Okay! Okay!
            </p>
            <p>
              Maui hotel or Maui condo? It’s the burning question on everyones mind! What should you do? Maui hotel?
              Maui condo? Which should you choose? The sweat is pouring down your face and you can feel the pressure
              building…Okay! Okay!
            </p>
            <p>
              Maui hotel or Maui condo? It’s the burning question on everyones mind! What should you do? Maui hotel?
              Maui condo? Which should you choose? The sweat is pouring down your face and you can feel the pressure
              building…Okay! Okay!
            </p>
            <div className="links-wrapper">
              <ul>
                <li>
                  <a href="">additional links</a>
                </li>
                <li>
                  <a href="">additional links</a>
                </li>
                <li>
                  <a href="">additional links</a>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className="map-wrapper">
          <h4>Place to meet</h4>
          <p>address</p>
          <div className="map"></div>
        </div>
      </div>
    </WrapperModalMentor>
  );
};

export default ModalMentor;
