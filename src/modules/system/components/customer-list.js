import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Switch } from 'antd';
import { Link } from 'react-router';

import Search, { searchComposer, searchDataSource } from 'shared/components/search';
import { getUserStatusText, ACTIVE } from 'shared/constants/user-status';
import { time } from 'shared/utils/formatter';
import { getGenderText } from 'shared/constants/gender';

export default compose(
  setPropTypes({
    users: PropTypes.array.isRequired,
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
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: getGenderText,
    }, {
      title: '注册时间',
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
      render: (status, { id }) => (
        <Switch
          checked={status === ACTIVE}
          onChange={toggleUserStatus({ id, status })}
        />
      ),
    }, {
      title: '操作',
      key: 'operation',
      render: (value, { id }) => (
        <div>
          <Link to={`/system/customer/view/${id}`}>查看详情</Link>
        </div>
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
