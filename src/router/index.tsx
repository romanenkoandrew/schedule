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
      <Router history={history}>
        <Header />
        {didCatch ? (
          showAlert()
        ) : (
          <ErrorBoundary>
            <Switch>
              <Route exact component={Main} path={Routes.Main} />
              <Route exact component={Calendar} path={Routes.Calendar} />
              <Route exact component={List} path={Routes.List} />
              <Redirect from="/" to={Routes.Main} />
            </Switch>
          </ErrorBoundary>
        )}
      </Router>
    </Provider>
  );
};

export default Routers;
