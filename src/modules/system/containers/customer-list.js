import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';
import Layout from 'shared/containers/layout';

import {
  update as updateUserAction,
} from 'shared/entities/actions/user';
import Stats from 'shared/components/stats';
import { ACTIVE, INACTIVE } from 'shared/constants/user-status';
import List from '../components/customer-list';
import selector from './customer-list-selector';

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
      Message.success('Update user status success!');
    }),
  }),
)(({ users, statsItems, toggleUserStatus }) => (
  <Layout>
    <Stats items={statsItems} />

    <List users={users} toggleUserStatus={toggleUserStatus} />
  </Layout>
));
