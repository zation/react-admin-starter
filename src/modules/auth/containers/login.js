import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'shared/history';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';

import { ACTIVE } from 'shared/constants/user-status';
import { login as loginAction } from 'shared/entities/actions/auth';
import Form from '../components/login-form';
import Layout from '../components/layout';

export default compose(
  connect(
    null, {
      login: loginAction,
      push: pushAction,
    },
  ),
  withHandlers({
    login: ({ login, push }) => ({ username, password }) =>
      login({ username, password }).then(({ payload: { user: { status } } }) => {
        if (status === ACTIVE) {
          push('/');
        } else {
          Message.error('User is inactive, please contact admin.');
        }
      }),
  }),
  setDisplayName(__filename),
)(({ login }) => (
  <Layout>
    <Form onSubmit={login} />
  </Layout>
));
