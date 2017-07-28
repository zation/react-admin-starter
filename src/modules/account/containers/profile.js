import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';
import Layout from 'shared/containers/layout';

import { update as updateUserAction } from 'shared/entities/actions/user';
import Form from '../components/profile-form';
import selector from './profile-selector';

export default compose(
  connect(
    selector, {
      update: updateUserAction,
    },
  ),
  withHandlers({
    update: ({ update }) => values =>
      update(values).then(() => Message.success('Update profile success!')),
  }),
  setDisplayName(__filename),
)(({ update, initialValues }) => (
  <Layout>
    <Form onSubmit={update} initialValues={initialValues} />
  </Layout>
));
