import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { compose, setDisplayName, withHandlers } from 'recompose';

import { update as updateRoleAction } from 'shared/entities/actions/role';
import Form from '../components/role-form';
import selector from './role-editor-selector';

export default compose(
  connect(
    selector, {
      updateRole: updateRoleAction,
    },
  ),
  withHandlers({
    updateRole: ({ updateRole, roleId }) => values => updateRole({
      id: roleId,
      ...values,
    }).then(() => Message.info('修改权限组成功！')),
  }),
  setDisplayName(__filename),
)(({ updateRole, initialValues }) => (
  <div>
    <Form
      onSubmit={updateRole}
      initialValues={initialValues}
    />
  </div>
));
