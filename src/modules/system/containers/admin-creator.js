import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { push as pushAction } from 'shared/entities/actions/history';
import Layout from 'shared/containers/layout';

import { create as createUserAction } from 'shared/entities/actions/user';
import Form from '../components/admin-form';
import selector from './admin-creator-selector';

export default compose(
  connect(
    selector, {
      createUser: createUserAction,
      push: pushAction,
    },
  ),
  withHandlers({
    createUser: ({ createUser, push }) => values => createUser(values).then((action) => {
      Message.info('Create user success!');
      push(`/system/admin/edit/${action.payload.id}`);
    }),
  }),
  setDisplayName(__filename),
)(({ createUser, roleOptions, initialValues }) => (
  <Layout>
    <Form onSubmit={createUser} roleOptions={roleOptions} initialValues={initialValues} />
  </Layout>
));
