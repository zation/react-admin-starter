import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router';
import { includes } from 'lodash/fp';

const notAbleToModifiedKeies = ['USER_MANAGER', 'CONTENT_MANAGER', 'MARKET_MANAGER'];

export default compose(
  setPropTypes({
    roles: PropTypes.array.isRequired,
  }),
  setDisplayName(__filename),
  withProps(({ removeRole }) => ({
    columns: [{
      title: '组名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '权限',
      dataIndex: 'operations',
      key: 'operations',
    }, {
      title: '操作',
      key: 'operation',
      render: (value, { id, key }) => (
        includes(key)(notAbleToModifiedKeies) ? null : (
          <div>
            <Link to={`/system/role/edit/${id}`}>编辑</Link>&nbsp;&nbsp;
            <Popconfirm
              title="确认删除该角色吗？"
              onConfirm={() => removeRole({ id })}
            >
              <a>删除</a>
            </Popconfirm>
          </div>
        )
      ),
    }],
  })),
)(({ roles, columns }) => (
  <Table columns={columns} dataSource={roles} rowKey="id" />
));
