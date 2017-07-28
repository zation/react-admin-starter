import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Popconfirm, Switch } from 'antd';
import Link from 'shared/components/link';

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
      title: 'Cover',
      key: 'cover',
      dataIndex: 'cover',
      render: (cover) => <Image width={120} src={cover} alt="cover" />,
    }, {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    }, {
      title: 'Original Price',
      key: 'originalPrice',
      dataIndex: 'originalPrice',
      render: price(),
    }, {
      title: 'Sales Price',
      key: 'price',
      dataIndex: 'price',
      render: price(),
    }, {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
    }, {
      title: 'Category',
      key: 'category',
      dataIndex: 'category',
    }, {
      title: 'Publish',
      key: 'status',
      dataIndex: 'status',
      render: (status, { id }) => (
        <div>
          <Switch checked={status === PUBLISHED} onChange={toggleProductStatus({ id, status })} />
        </div>
      ),
    }, {
      title: 'Recommendation',
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
      title: 'Operation',
      key: 'operation',
      render: ({ id }) => (
        <div>
          <a
            href={`${FRONT_END_DOMAIN}/shop/product/${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview
          </a>
          &nbsp;&nbsp;
          <Link to={`/shop/product/edit/${id}`}>Edit</Link>
          &nbsp;&nbsp;
          <Popconfirm
            title="Confirm to delete this product?"
            onConfirm={() => removeProduct({ id })}
          >
            <a>Delete</a>
          </Popconfirm>
        </div>
      ),
    }],
  })),
  searchComposer,
)(({ products, columns, search, query }) => (
  <div>
    <Search
      placeholder="Please search by name, category, type"
      search={search}
    />

    <Table
      dataSource={searchDataSource(['name', 'type', 'category'], query)(products)}
      columns={columns}
      rowKey="id"
    />
  </div>
));
