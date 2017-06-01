import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { compose, setDisplayName, withHandlers } from 'recompose';

import { update as updateUserAction } from 'shared/entities/actions/user';
import Form from '../components/admin-form';
import selector from './admin-editor-selector';

export default compose(
  connect(
    selector, {
      updateUser: updateUserAction,
    },
  ),
  withHandlers({
    updateUser: ({ updateUser, userId }) => values => updateUser({
      id: userId,
      ...values,
    }).then(() => Message.info('修改用户成功！')),
  }),
  setDisplayName(__filename),
)(({ updateUser, roleOptions, initialValues }) => (
  <div>
    <Form
      onSubmit={updateUser}
      roleOptions={roleOptions}
      initialValues={initialValues}
      isEdit
    />
  </div>
));
