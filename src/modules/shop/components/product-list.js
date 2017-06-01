import React, { PropTypes } from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Popconfirm, Switch } from 'antd';
import { Link } from 'react-router';

import Search, { searchComposer, searchDataSource } from 'shared/components/search';
import Image from 'shared/components/image';
import { price } from 'shared/utils/formatter';
import { PUBLISHED } from 'shared/constants/product-status';

const { CONFIG: { FRONT_END_DOMAIN } } = global;

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    products: PropTypes.array.isRequired,
    removeProduct: PropTypes.func.isRequired,
    toggleProductStatus: PropTypes.func.isRequired,
    toggleRecommendation: PropTypes.func.isRequired,
  }),
  withProps(({ removeProduct, toggleProductStatus, toggleRecommendation }) => ({
    columns: [{
      title: '封面',
      key: 'cover',
      dataIndex: 'cover',
      render: (cover) => <Image width={120} src={cover} alt="cover" />,
    }, {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    }, {
      title: '原价',
      key: 'originalPrice',
      dataIndex: 'originalPrice',
      render: price(),
    }, {
      title: '销售价',
      key: 'price',
      dataIndex: 'price',
      render: price(),
    }, {
      title: '类别',
      key: 'type',
      dataIndex: 'type',
    }, {
      title: '类型',
      key: 'category',
      dataIndex: 'category',
    }, {
      title: '是否上架',
      key: 'status',
      dataIndex: 'status',
      render: (status, { id }) => (
        <div>
          <Switch checked={status === PUBLISHED} onChange={toggleProductStatus({ id, status })} />
        </div>
      ),
    }, {
      title: '是否推荐',
      key: 'recommendation',
      dataIndex: 'isRecommended',
      render: (isRecommended, { id, status }) => (
        <div>
          <Switch
            checked={isRecommended}
            disabled={status !== PUBLISHED}
            onChange={toggleRecommendation({ id, isRecommended })}
          />
        </div>
      ),
    }, {
      title: '操作',
      key: 'operation',
      render: ({ id }) => (
        <div>
          <a
            href={`${FRONT_END_DOMAIN}/shop/product/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            预览
          </a>
          &nbsp;&nbsp;
          <Link to={`/shop/product/edit/${id}`}>编辑</Link>
          &nbsp;&nbsp;
          <Popconfirm
            title="确定删除该产品吗？"
            onConfirm={() => removeProduct({ id })}
          >
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    }],
  })),
  searchComposer,
)(({ products, columns, search, query }) => (
  <div>
    <Search
      placeholder="请输入名称、类别、类型进行搜索"
      search={search}
    />

    <Table
      dataSource={searchDataSource(['name', 'type', 'category'], query)(products)}
      columns={columns}
      rowKey="id"
    />
  </div>
));
