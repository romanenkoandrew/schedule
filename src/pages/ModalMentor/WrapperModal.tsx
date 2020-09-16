import styled from 'styled-components';

export const WrapperModal = styled.div`
body {
\tmargin: 0 auto;
}

.modal {
\tfont-family: "Roboto";
\tbackground: #ffffff;
\tmax-width: 1280px;
\tpadding: 50px;
\tmargin: 0 auto;
\t}

.wrapper-content {
\tdisplay: flex;
\tflex-direction: row;
}

@media (max-width: 674px) {
\t.modal {
\t\tpadding: 20px;
\t}

\t.wrapper-content {
\t\tflex-direction: column;
\t}
}

aside {
  width: 19.7%;
  min-width: 253px;

  & .wrapper-aside {
    padding: 19px 26px;
    border: 1px solid #E8E8E8;

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
      background: #FCDDEE;
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
          color: #73808D;
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


.description {
  width: 46.4%;
  padding: 0 0 0 70px;

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
    color: #1890FF;
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
    color: #7A7A7A;
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

.feedback {
  width: 483px;
  border: 1px solid #E8E8E8;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 62px;

  & textarea {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #000;
    border: 1px solid #E8E8E8;
    padding: 10px;
    outline: none;
    width: 417px;
    height: 80px;
  }

  & p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 22px;
    color: #000000;
    padding-bottom: 20px;
    margin: 0;
  }

  .wrapper-btn {
    display: flex;
    justify-content: flex-end;

    & button {
      display: block;
      background: #1890FF;
      border-radius: 4px;
      width: 115px;
      height: 32px;
      color: white;
      outline: none;
      border: transparent;
      margin-top: 20px;

      &:hover,
      &:focus,
      &:active {
        background: #2e649f;
        outline: none;
        color: white;
      }
    }
  }
}

@media (max-width: 674px) {
  .feedback {
    width: 100%;

    & textarea {
      width: 95%;
    }
  }
}

.wrapper-title {
  margin: 0 0 22px 0;

  & h1 {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 38px;
    line-height: 46px;
    color: #262626;
    width: 673px;
    text-align: center;
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;
    padding: 36px 0;
    margin: 0 auto;
  }
}

@media (max-width: 674px) {
  .wrapper-title {
    & h1 {
      width: 90%;
      font-size: 25px;
    }
  }
}


`;
