import React from 'react';
import { WrapperModalStudent } from './WrapperModalStudent';

const ModalStudent: React.FC = () => {
  return (
    <WrapperModalStudent>
      <div className="modal">
        <div className="wrapper-title">
          <h1>Task name</h1>
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
                  <img src="img/clock-circle.svg" alt="clock" />
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
        <section className="feedback">
          <form action="">
            <p>Leave feedback</p>
            <label htmlFor="">
              <textarea name="" id="" placeholder="Textarea placeholder">
                {' '}
              </textarea>
            </label>
            <div className="wrapper-btn">
              <button type="submit">Send</button>
            </div>
          </form>
        </section>
      </div>
    </WrapperModalStudent>
  );
};

export default ModalStudent;
