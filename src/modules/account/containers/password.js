import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';

import { resetPassword as resetPasswordAction } from 'shared/entities/actions/user';
import Form from '../components/password-form';
import selector from './password-selector';

export default compose(
  connect(
    selector, {
      resetPassword: resetPasswordAction,
    },
  ),
  withHandlers({
    resetPassword: ({ resetPassword, userId }) => (values) =>
      resetPassword({
        ...values,
        userId,
      }).then(() => Message.success('修改密码成功！')),
  }),
  setDisplayName(__filename),
)(({ resetPassword }) => (
  <Form onSubmit={resetPassword} />
));
