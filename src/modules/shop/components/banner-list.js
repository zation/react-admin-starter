import PropTypes from 'prop-types';
import React from 'react';
import { setDisplayName, compose, setPropTypes, withProps, pure } from 'recompose';
import Link from 'shared/components/link';
import { Popconfirm, Table } from 'antd';
import { size } from 'lodash/fp';

import Image from 'shared/components/image';
import { getLinkTargetText } from 'shared/constants/link-target';

export default compose(
  pure,
  setDisplayName(__filename),
  setPropTypes({
    banners: PropTypes.array.isRequired,
    editLink: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    forward: PropTypes.func.isRequired,
    backward: PropTypes.func.isRequired,
  }),
  withProps(({ remove, forward, backward, banners, editLink }) => ({
    columns: [{
      title: 'Order',
      key: 'order',
      dataIndex: 'order',
    }, {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
      render: (image) => <Image width={120} src={image} alt="cover" style={{ width: 120 }} />,
    }, {
      title: 'Link',
      key: 'link',
      dataIndex: 'link',
    }, {
      title: 'Target',
      key: 'target',
      dataIndex: 'target',
      render: getLinkTargetText,
    }, {
      title: 'Operation',
      key: 'operation',
      render: ({ order }) => (
        <div>
          <a disabled={order === 1} onClick={forward({ order })}>Add Order</a>
          &nbsp;&nbsp;
          <a disabled={size(banners) === order} onClick={backward({ order })}>Reduce Order</a>
          &nbsp;&nbsp;
          <Link to={`${editLink}/${order}`}>Edit</Link>
          &nbsp;&nbsp;
          <Popconfirm
            title="Confirm to remove this banner?"
            onConfirm={remove({ order })}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    }],
  })),
)(({ columns, banners }) => (
  <Table
    columns={columns}
    dataSource={banners}
    rowKey="order"
  />
));
