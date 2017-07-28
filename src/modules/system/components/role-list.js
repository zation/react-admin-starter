import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Popconfirm } from 'antd';
import Link from 'shared/components/link';
import { includes } from 'lodash/fp';

const notAbleToModifiedKeies = ['USER_MANAGER', 'CONTENT_MANAGER', 'MARKET_MANAGER'];

export default compose(
  setPropTypes({
    roles: PropTypes.array.isRequired,
  }),
  setDisplayName(__filename),
  withProps(({ removeRole }) => ({
    columns: [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Operations',
      dataIndex: 'operations',
      key: 'operations',
    }, {
      title: 'Operation',
      key: 'operation',
      render: (value, { id, key }) => (
        includes(key)(notAbleToModifiedKeies) ? null : (
          <div>
            <Link to={`/system/role/edit/${id}`}>Edit</Link>&nbsp;&nbsp;
            <Popconfirm
              title="Confirm to delete this role?"
              onConfirm={() => removeRole({ id })}
            >
              <a>Delete</a>
            </Popconfirm>
          </div>
        )
      ),
    }],
  })),
)(({ roles, columns }) => (
  <Table columns={columns} dataSource={roles} rowKey="id" />
));
