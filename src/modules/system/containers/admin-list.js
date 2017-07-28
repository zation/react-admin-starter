import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Button, Message } from 'antd';
import Link from 'shared/components/link';
import Layout from 'shared/containers/layout';

import {
  update as updateUserAction,
} from 'shared/entities/actions/user';
import { ACTIVE, INACTIVE } from 'shared/constants/user-status';
import List from '../components/admin-list';
import selector from './admin-list-selector';

export default compose(
  connect(
    selector, {
      updateUser: updateUserAction,
    },
  ),
  setDisplayName(__filename),
  withHandlers({
    toggleUserStatus: ({ updateUser }) => ({ id, status }) => () => updateUser({
      id,
      status: status === ACTIVE ? INACTIVE : ACTIVE,
    }).then(() => {
      Message.success('Update admin success!');
    }),
  }),
)(({ users, toggleUserStatus }) => (
  <Layout>
    <Button type="primary" style={{ marginBottom: 10 }} size="large">
      <Link to="/system/admin/create">Create</Link>
    </Button>

    <List users={users} toggleUserStatus={toggleUserStatus} />
  </Layout>
));
