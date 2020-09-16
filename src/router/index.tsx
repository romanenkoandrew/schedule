import Routes from 'constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Main, Calendar, List, Modal } from 'pages';
import store from 'store';

const history = createBrowserHistory();

const Routers = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Redirect exact={true} from="/" to={Routes.Main} />
          <Route component={Main} path={Routes.Main} />
          <Route component={Calendar} path={Routes.Calendar} />
          <Route component={List} path={Routes.List} />
          <Route component={Modal} path={Routes.Modal} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routers;
