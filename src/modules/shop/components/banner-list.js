import PropTypes from 'prop-types';
import React from 'react';
import { setDisplayName, compose, setPropTypes, withProps, pure } from 'recompose';
import { Link } from 'react-router';
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
      title: '序号',
      key: 'order',
      dataIndex: 'order',
    }, {
      title: '图片',
      key: 'image',
      dataIndex: 'image',
      render: (image) => <Image width={120} src={image} alt="cover" style={{ width: 120 }} />,
    }, {
      title: '链接',
      key: 'link',
      dataIndex: 'link',
    }, {
      title: '打开方式',
      key: 'target',
      dataIndex: 'target',
      render: getLinkTargetText,
    }, {
      title: '操作',
      key: 'operation',
      render: ({ order }) => (
        <div>
          <a disabled={order === 1} onClick={forward({ order })}>顺序提前</a>
          &nbsp;&nbsp;
          <a disabled={size(banners) === order} onClick={backward({ order })}>顺序推后</a>
          &nbsp;&nbsp;
          <Link to={`${editLink}/${order}`}>编辑</Link>
          &nbsp;&nbsp;
          <Popconfirm
            title="确定删除该横幅吗？"
            onConfirm={remove({ order })}
          >
            <a>删除</a>
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
