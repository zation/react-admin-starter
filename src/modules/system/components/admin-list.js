import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Switch } from 'antd';
import { Link } from 'react-router';

import Search, { searchComposer, searchDataSource } from 'shared/components/search';
import { getUserStatusText, ACTIVE } from 'shared/constants/user-status';
import { ADMIN } from 'shared/constants/user-role';
import { time } from 'shared/utils/formatter';

export default compose(
  setPropTypes({
    users: PropTypes.array.isRequired,
    toggleUserStatus: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  searchComposer,
  withProps(({ toggleUserStatus }) => ({
    columns: [{
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Role',
      dataIndex: 'role.name',
      key: 'role.name',
    }, {
      title: 'Create Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: time(),
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: getUserStatusText,
    }, {
      title: 'Activate / Inactivate',
      dataIndex: 'status',
      key: 'activation',
      render: (status, { id, role }) => (
        role.key !== ADMIN
        ? (
          <Switch checked={status === ACTIVE} onChange={toggleUserStatus({ id, status })} />
        ) : null
      ),
    }, {
      title: 'Operation',
      key: 'operation',
      render: (value, { id, role }) => (
        role.key !== ADMIN
        ? (
          <div>
            <Link to={`/system/admin/edit/${id}`}>Edit</Link>&nbsp;&nbsp;
          </div>
        ) : null
      ),
    }],
  })),
)(({ users, search, query, columns }) => (
  <div>
    <Search
      placeholder="Please search by nickname, email"
      search={search}
    />

    <Table
      columns={columns}
      dataSource={searchDataSource(['nickname', 'email'], query)(users)}
      rowKey="id"
    />
  </div>
));
