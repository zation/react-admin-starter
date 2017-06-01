import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';

import { ACTIVE } from 'shared/constants/user-status';
import { login as loginAction } from 'shared/entities/actions/auth';
import Form from '../components/login-form';

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
          Message.error('用户未激活，请联系管理员激活帐号后登录。');
        }
      }),
  }),
  setDisplayName(__filename),
)(({ login }) => (
  <div>
    <Form onSubmit={login} />
  </div>
));
