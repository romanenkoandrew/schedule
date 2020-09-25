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
    width: 19.7%;
    min-width: 253px;

    & .wrapper-aside {
      padding: 19px 26px;
      border: 1px solid #e8e8e8;

      & .date-title,
      & .deadline-title,
      & .time-to-finish-title,
      & .stack {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
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
        font-size: 14px;
        line-height: 22px;
        color: #595959;
      }

      & .dates,
      & .deadline,
      & .wrapper-time-to-finish {
        padding-bottom: 17px;
      }

      & .deadline-date {
        width: 110px;
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

  .close {
    position: absolute;
    top: 20px;
    right: 26px;
    border: transparent;
    outline: none;
    background: transparent;
    cursor: pointer;

    &:hover,
    &:focus,
    &:active {
      border: transparent;
      background: transparent;
    }
  }

  .description {
    padding: 0 10px 0 70px;

    & .links-wrapper ul li,
    & .description-link {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      display: flex;
      align-items: center;
      text-decoration-line: underline;
      color: #1890ff;
      outline: none;
      padding: 20px 0 0 0;

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
      font-size: 14px;
      line-height: 22px;
      color: #000000;
      padding: 0;
      margin: 0;
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
          padding: 7px 0 7px 0;
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 674px) {
    .description {
      width: 90%;
      padding: 20px 0 0 0;
    }
  }

  .map-wrapper {
    margin: 0 auto;

    & h4 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 22px;
      color: #000000;
      padding: 0;
      margin: 0;
    }

    & .map {
      width: 100%;
      height: 400px;
      background: #00b172; //убрать после добавления карты
    }

    & p {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .panel-mentor-wrapper {
    position: absolute;
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

    /* & .task {
      position: absolute;
      top: 20px;
      left: 70%;
    }

    & .self-ed {
      position: absolute;
      top: 46px;
      left: 70%;
    } */

    & h1 {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 500;
      font-size: 38px;
      line-height: 46px;
      color: #262626;
      /* width: 673px; */
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
        padding: 16px 0;
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
