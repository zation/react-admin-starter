import React, { PropTypes } from 'react';
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
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '权限组',
      dataIndex: 'role.name',
      key: 'role.name',
    }, {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: time(),
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: getUserStatusText,
    }, {
      title: '激活/禁用',
      dataIndex: 'status',
      key: 'activation',
      render: (status, { id, role }) => (
        role.key !== ADMIN
        ? (
          <Switch checked={status === ACTIVE} onChange={toggleUserStatus({ id, status })} />
        ) : null
      ),
    }, {
      title: '操作',
      key: 'operation',
      render: (value, { id, role }) => (
        role.key !== ADMIN
        ? (
          <div>
            <Link to={`/system/admin/edit/${id}`}>编辑</Link>&nbsp;&nbsp;
          </div>
        ) : null
      ),
    }],
  })),
)(({ users, search, query, columns }) => (
  <div>
    <Search
      placeholder="请输入昵称、Email进行搜索"
      search={search}
    />

    <Table
      columns={columns}
      dataSource={searchDataSource(['nickname', 'email'], query)(users)}
      rowKey="id"
    />
  </div>
));
