import Routes from 'constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Main, Calendar, List } from 'pages';
import Header from 'components/Header';
import store from 'store';
import useErrorBoundary from 'use-error-boundary';
import { Alert } from 'antd';
import { DEPLOY_URL } from 'constants/deploy/deploy';

const history = createBrowserHistory();

const Routers = () => {
  const { ErrorBoundary, didCatch } = useErrorBoundary();

  const showAlert = () => {
    setTimeout(() => (document.location.href = DEPLOY_URL), 2000);
    return (
      <Alert
        message="Error"
        description="Oops! An unknown error has occurred. We will fix it shortly. Now you will be redirected to the main page."
        type="error"
        showIcon
      />
    );
  };

  return (
    <Provider store={store}>
      {didCatch ? (
        showAlert()
      ) : (
        <ErrorBoundary>
          <Router history={history}>
            <Header />
            <Switch>
              <Redirect exact={true} from="/" to={Routes.Main} />
              <Route component={Main} path={Routes.Main} />
              <Route component={Calendar} path={Routes.Calendar} />
              <Route component={List} path={Routes.List} />
            </Switch>
          </Router>
        </ErrorBoundary>
      )}
    </Provider>
  );
};

export default Routers;
