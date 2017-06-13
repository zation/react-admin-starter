import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Popconfirm } from 'antd';
import { Link } from 'react-router';

import Search, { searchComposer, searchDataSource } from 'shared/components/search';
import { price } from 'shared/utils/formatter';
import { getOrderStatusText, CLOSED, FINISHED } from 'shared/constants/order-status';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    orders: PropTypes.array.isRequired,
    closeOrder: PropTypes.func.isRequired,
    completeOrder: PropTypes.func.isRequired,
  }),
  withProps(({ closeOrder, completeOrder }) => ({
    columns: [{
      title: 'Order Number',
      key: 'orderNo',
      dataIndex: 'orderNo',
    }, {
      title: 'Username',
      key: 'user.username',
      dataIndex: 'user.username',
    }, {
      title: 'Receiver Phone',
      key: 'receiverPhone',
      dataIndex: 'receiverPhone',
    }, {
      title: 'Total',
      key: 'total',
      dataIndex: 'total',
      render: price(),
    }, {
      title: 'Grand Total',
      key: 'grandTotal',
      dataIndex: 'grandTotal',
      render: price(),
    }, {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (
        orderStatus,
        { payment: { status: paymentStatus }, shippingCompany, shippingNumber },
      ) => getOrderStatusText(orderStatus, paymentStatus, shippingCompany, shippingNumber),
    }, {
      title: 'Operation',
      key: 'operation',
      render: ({ id, status }) => (
        <div>
          <Link to={`/shop/order/view/${id}`}>View Details</Link>
          &nbsp;&nbsp;
          <Link to={`/shop/order/edit/${id}`}>Edit</Link>
          &nbsp;&nbsp;
          {status !== CLOSED && status !== FINISHED
            ? (
              <Popconfirm
                title="Confirm to close this order?"
                onConfirm={closeOrder({ id })}
              >
                <a>Close</a>
              </Popconfirm>
            ) : null}
          &nbsp;&nbsp;
          {status !== CLOSED && status !== FINISHED
            ? (
              <Popconfirm
                title="Confirm to complete this order?"
                onConfirm={completeOrder({ id })}
              >
                <a>Complete</a>
              </Popconfirm>
            ) : null}
        </div>
      ),
    }],
  })),
  searchComposer,
)(({ orders, columns, search, query }) => (
  <div>
    <Search
      placeholder="Please search by order number, username, receiver phone"
      search={search}
    />

    <Table
      dataSource={
        searchDataSource(['orderNo', 'user.username', 'receiverPhone'], query)(orders)
      }
      columns={columns}
      rowKey="id"
    />
  </div>
));
