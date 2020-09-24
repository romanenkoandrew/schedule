import Routes from 'constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Main, Calendar, List, ModalStudent, ModalMentor } from 'pages';
import Header from 'components/Header';
import store from 'store';

const history = createBrowserHistory();

const Routers = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Switch>
          <Redirect exact={true} from="/" to={Routes.Main} />
          <Route component={Main} path={Routes.Main} />
          <Route component={Calendar} path={Routes.Calendar} />
          <Route component={List} path={Routes.List} />
          <Route component={ModalStudent} path={Routes.ModalStudent} />
          <Route component={ModalMentor} path={Routes.ModalMentor} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routers;
