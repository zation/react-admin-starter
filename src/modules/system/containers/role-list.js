import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { Button } from 'antd';
import Link from 'shared/components/link';
import Layout from 'shared/containers/layout';

import { remove as removeRoleAction } from 'shared/entities/actions/role';
import List from '../components/role-list';
import selector from './role-list-selector';

export default compose(
  connect(selector, {
    removeRole: removeRoleAction,
  }),
  setDisplayName(__filename),
)(({ roles, removeRole }) => (
  <Layout>
    <Button type="primary" style={{ marginBottom: 10 }} size="large">
      <Link to="/system/role/create">Create</Link>
    </Button>

    <List roles={roles} removeRole={removeRole} />
  </Layout>
));
