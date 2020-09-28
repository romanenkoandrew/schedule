import React, { useState, useEffect } from 'react';
import { message, Alert } from 'antd';
import useErrorBoundary from 'use-error-boundary';
import { DEPLOY_URL } from 'constants/deploy/deploy';

const BugCatcher = (props: any) => {
  const { error, loading } = props;

  const showMessage = () => {
    if (loading) {
      return message.loading({ content: 'request...', key: 'updatable' });
    }
    if (!loading && error) {
      return message.error({ content: 'Bad Request!', key: 'updatable', duration: 2 });
    }
    if (!loading && !error) {
      return message.success({ content: 'Success!', key: 'updatable', duration: 2 });
    }
  };

  useEffect(() => {
    showMessage();
  }, [loading, error]);

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

  return <div>{didCatch ? showAlert() : <ErrorBoundary>{props.children}</ErrorBoundary>}</div>;
};

export default BugCatcher;
