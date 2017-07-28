import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { push as pushAction } from 'shared/entities/actions/history';
import Layout from 'shared/containers/layout';

import { create as createRoleAction } from 'shared/entities/actions/role';
import Form from '../components/role-form';
import selector from './role-creator-selector';

export default compose(
  connect(
    selector, {
      createRole: createRoleAction,
      push: pushAction,
    },
  ),
  withHandlers({
    createRole: ({ createRole, push }) => values => createRole(values)
      .then(action => {
        Message.info('Create role success!');
        push(`/system/role/edit/${action.payload.id}`);
      }),
  }),
  setDisplayName(__filename),
)(({ createRole, initialValues }) => (
  <Layout>
    <Form
      onSubmit={createRole}
      initialValues={initialValues}
    />
  </Layout>
));
