import React, { PropTypes } from 'react';
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
      title: '订单号',
      key: 'orderNo',
      dataIndex: 'orderNo',
    }, {
      title: '用户名',
      key: 'user.username',
      dataIndex: 'user.username',
    }, {
      title: '收货电话',
      key: 'receiverPhone',
      dataIndex: 'receiverPhone',
    }, {
      title: '原价',
      key: 'total',
      dataIndex: 'total',
      render: price(),
    }, {
      title: '应付款',
      key: 'grandTotal',
      dataIndex: 'grandTotal',
      render: price(),
    }, {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (
        orderStatus,
        { payment: { status: paymentStatus }, shippingCompany, shippingNumber },
      ) => getOrderStatusText(orderStatus, paymentStatus, shippingCompany, shippingNumber),
    }, {
      title: '操作',
      key: 'operation',
      render: ({ id, status }) => (
        <div>
          <Link to={`/shop/order/view/${id}`}>查看</Link>
          &nbsp;&nbsp;
          <Link to={`/shop/order/edit/${id}`}>编辑</Link>
          &nbsp;&nbsp;
          {status !== CLOSED && status !== FINISHED
            ? (
              <Popconfirm
                title="确定关闭该订单吗？"
                onConfirm={closeOrder({ id })}
              >
                <a>关闭</a>
              </Popconfirm>
            ) : null}
          &nbsp;&nbsp;
          {status !== CLOSED && status !== FINISHED
            ? (
              <Popconfirm
                title="确定完成该订单吗？"
                onConfirm={completeOrder({ id })}
              >
                <a>完成</a>
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
      placeholder="请输入订单号、用户名、收货电话进行搜索"
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
