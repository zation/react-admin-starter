import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { Button } from 'antd';
import { Link } from 'react-router';

import { remove as removeRoleAction } from 'shared/entities/actions/role';
import List from '../components/role-list';
import selector from './role-list-selector';

export default compose(
  connect(selector, {
    removeRole: removeRoleAction,
  }),
  setDisplayName(__filename),
)(({ roles, removeRole }) => (
  <div>
    <Button type="primary" style={{ marginBottom: 10 }} size="large">
      <Link to="/system/role/create">添加权限组</Link>
    </Button>

    <List roles={roles} removeRole={removeRole} />
  </div>
));
