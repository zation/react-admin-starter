import PropTypes from 'prop-types';
import React from 'react';
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
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: getGenderText,
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
      render: (status, { id }) => (
        <Switch
          checked={status === ACTIVE}
          onChange={toggleUserStatus({ id, status })}
        />
      ),
    }, {
      title: 'Operation',
      key: 'operation',
      render: (value, { id }) => (
        <div>
          <Link to={`/system/customer/view/${id}`}>View Details</Link>
        </div>
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
