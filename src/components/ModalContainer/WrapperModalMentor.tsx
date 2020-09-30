import styled from 'styled-components';

export const WrapperModalMentor = styled.div`
  body {
    margin: 0 auto;
  }

  .modal {
    font-family: 'Roboto';
    background: #ffffff;
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
  }

  .wrapper-content {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 674px) {
    .modal {
      padding: 0;
    }

    .wrapper-content {
      flex-direction: column;
    }
  }

  aside {
    & .wrapper-aside {
      padding: 19px 26px;
      border: 1px solid #e8e8e8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & .deadline-title {
        text-align: center;
      }

      & .date-title,
      & .deadline-title,
      & .time-to-finish-title,
      & .stack {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        color: #000000;
      }

      & .start-date,
      & .end-date,
      & .deadline-date,
      & .time-to-finish {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
        color: #595959;
      }

      & .dates,
      & .deadline,
      & .wrapper-time-to-finish {
        padding-bottom: 17px;
        text-align: center;
      }

      & .deadline-date {
        height: 32px;
        background: #fcddee;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }

      & .time-to-finish {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
      }

      & .stack {
        & .stack-title {
          padding: 0;
        }

        & ul {
          list-style-type: none;
          padding-inline-start: 0;
          margin: 0;

          & li {
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 11px;
            line-height: 18px;
            color: #73808d;
          }
        }
      }
    }
  }

  @media (max-width: 674px) {
    aside {
      margin: 0 auto;
    }
  }

  @media (max-width: 480px) {
    aside {
      margin: unset;

      & .wrapper-aside {
        border: transparent;
        padding: 0px;
      }
    }
  }

  .description {
    padding: 0 10px 0 70px;
    width: 80%;

    & .links-wrapper ul li,
    & .description-link {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
      display: flex;
      align-items: center;
      text-decoration-line: underline;
      color: #1890ff;
      outline: none;

      &:hover,
      &:focus,
      &:active {
        text-decoration-line: underline;
        color: #2e649f;
        outline: none;
      }
    }

    & h2 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
      padding: 0;
    }

    & p {
      font-family: 'Overpass';
      font-style: normal;
      font-weight: 300;
      font-size: 16px;
      color: #7a7a7a;
      padding: 7px 0 0 0;
      line-height: 27px;
    }

    & .links-wrapper {
      padding: 0;

      ul {
        list-style-type: none;
        padding-inline-start: 0;

        li {
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 674px) {
    .description {
      width: 100%;
      padding: 0 10px;
    }
  }

  .map-wrapper {
    margin: 0 auto;

    & h4 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
      padding: 0;
      margin: 0;
    }

    & p {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 22px;
    }
  }

  .panel-mentor-wrapper {
    position: absolute;
    height: 100px;
    z-index: 2;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    align-content: center;
    border: 0.5px solid #d9d9d9;
    box-sizing: border-box;
    border-radius: 8px;

    & button {
      background: transparent;
      border: transparent;
      padding: 16px 5px;
      outline: none;
      cursor: pointer;

      &:hover,
      &:focus,
      &:active {
        border: transparent;
        outline: none;
        background: transparent;
      }
      &:disabled {
        cursor: default;
      }
    }
  }

  .wrapper-title {
    position: relative;
    > p {
      text-align: center;
    }
    & h1 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 38px;
      line-height: 46px;
      color: #262626;
      text-align: center;
      margin: 0 auto;
    }
  }

  @media (max-width: 674px) {
    .wrapper-title {
      & h1 {
        width: 90%;
        font-size: 25px;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
      }
    }
  }

  @media (max-width: 780px) {
    .wrapper-title {
      & .task {
        position: absolute;
        top: 10px;
        left: 0;
      }

      & .self-ed {
        position: absolute;
        top: 64px;
        left: 0;
      }
    }
  }
`;
