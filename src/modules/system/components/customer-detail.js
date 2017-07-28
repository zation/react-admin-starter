import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Row, Col } from 'antd';
import Link from 'shared/components/link';

import List from 'shared/components/list';
import { date, price } from 'shared/utils/formatter';
import { getGenderText } from 'shared/constants/gender';
import { getUserStatusText } from 'shared/constants/user-status';
import { getCouponTypeText } from 'shared/constants/coupon-type';
import { getCouponAvailabilityText } from 'shared/constants/coupon-availability';
import { getOrderStatusText } from 'shared/constants/order-status';

const items = [{
  title: 'Nickname',
  dataIndex: 'nickname',
}, {
  title: 'Username',
  dataIndex: 'username',
}, {
  title: 'Birthday',
  dataIndex: 'birthDay',
  render: date(),
}, {
  title: 'Gender',
  dataIndex: 'gender',
  render: getGenderText,
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: 'Status',
  dataIndex: 'status',
  render: getUserStatusText,
}, {
  title: 'Register Time',
  dataIndex: 'createdAt',
  render: date(),
}];

const couponColumns = [{
  key: 'name',
  title: 'Name',
  dataIndex: 'coupon.name',
}, {
  key: 'type',
  title: 'Type',
  dataIndex: 'coupon.type',
  render: getCouponTypeText,
}, {
  key: 'createdAt',
  title: 'Create Time',
  dataIndex: 'coupon.createdAt',
  render: date(),
}, {
  key: 'expiredAt',
  title: 'Expire Time',
  dataIndex: 'coupon.expiredAt',
  render: date(),
}, {
  key: 'availability',
  title: 'Availability',
  dataIndex: 'availability',
  render: getCouponAvailabilityText,
}];

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    user: PropTypes.object.isRequired,
    coupons: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
  }),
  withProps(({ user: { id: userId } }) => ({
    orderColumns: [{
      title: 'Order Number',
      key: 'orderNo',
      dataIndex: 'orderNo',
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
      render: ({ id }) => (
        <div>
          <Link to={`/shop/order/view/${id}?backUrl=/system/customer/view/${userId}`}>
            View
          </Link>
        </div>
      ),
    }],
  })),
)(({ user, coupons, orders, orderColumns }) => (
  <div>
    <List
      title="Basic Info"
      dataSource={user}
      items={items}
      labelLayout={{ span: 4, offset: 4 }}
    />

    <Row>
      <Col span={16} offset={4}>
        <h3 style={{ margin: '10px 0' }}>Coupon Info</h3>

        <Table
          dataSource={coupons}
          columns={couponColumns}
          rowKey="id"
        />
      </Col>
    </Row>

    <Row>
      <Col span={16} offset={4}>
        <h3 style={{ margin: '10px 0' }}>Order Info</h3>

        <Table
          dataSource={orders}
          columns={orderColumns}
          rowKey="id"
        />
      </Col>
    </Row>
  </div>
));
