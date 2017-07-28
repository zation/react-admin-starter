import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { compose, setDisplayName, withHandlers } from 'recompose';
import Layout from 'shared/containers/layout';

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
    }).then(() => Message.info('Edit user success!')),
  }),
  setDisplayName(__filename),
)(({ updateUser, roleOptions, initialValues }) => (
  <Layout>
    <Form
      onSubmit={updateUser}
      roleOptions={roleOptions}
      initialValues={initialValues}
      isEdit
    />
  </Layout>
));
