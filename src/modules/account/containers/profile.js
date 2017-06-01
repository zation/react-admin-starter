import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';

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
    update: ({ update }) => (values) =>
      update(values).then(() => Message.success('编辑帐号成功！')),
  }),
  setDisplayName(__filename),
)(({ update, initialValues }) => (
  <Form onSubmit={update} initialValues={initialValues} />
));
