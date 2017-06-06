import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router';

import List from 'shared/components/list';
import { date, price } from 'shared/utils/formatter';
import { getGenderText } from 'shared/constants/gender';
import { getUserStatusText } from 'shared/constants/user-status';
import { getCouponTypeText } from 'shared/constants/coupon-type';
import { getCouponAvailabilityText } from 'shared/constants/coupon-availability';
import { getOrderStatusText } from 'shared/constants/order-status';

const items = [{
  title: '昵称',
  dataIndex: 'nickname',
}, {
  title: '用户名',
  dataIndex: 'username',
}, {
  title: '生日',
  dataIndex: 'birthDay',
  render: date(),
}, {
  title: '性别',
  dataIndex: 'gender',
  render: getGenderText,
}, {
  title: 'Email',
  dataIndex: 'email',
}, {
  title: '状态',
  dataIndex: 'status',
  render: getUserStatusText,
}, {
  title: '注册日期',
  dataIndex: 'createdAt',
  render: date(),
}];

const couponColumns = [{
  key: 'name',
  title: '名称',
  dataIndex: 'coupon.name',
}, {
  key: 'type',
  title: '类型',
  dataIndex: 'coupon.type',
  render: getCouponTypeText,
}, {
  key: 'createdAt',
  title: '兑换日期',
  dataIndex: 'coupon.createdAt',
  render: date(),
}, {
  key: 'expiredAt',
  title: '过期时间',
  dataIndex: 'coupon.expiredAt',
  render: date(),
}, {
  key: 'availability',
  title: '状态',
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
      title: '订单号',
      key: 'orderNo',
      dataIndex: 'orderNo',
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
      render: ({ id }) => (
        <div>
          <Link to={`/shop/order/view/${id}?backUrl=/system/customer/view/${userId}`}>
            查看
          </Link>
        </div>
      ),
    }],
  })),
)(({ user, coupons, orders, orderColumns }) => (
  <div>
    <List
      title="基本信息"
      dataSource={user}
      items={items}
      labelLayout={{ span: 4, offset: 4 }}
    />

    <Row>
      <Col span={16} offset={4}>
        <h3 style={{ margin: '10px 0' }}>优惠券信息</h3>

        <Table
          dataSource={coupons}
          columns={couponColumns}
          rowKey="id"
        />
      </Col>
    </Row>

    <Row>
      <Col span={16} offset={4}>
        <h3 style={{ margin: '10px 0' }}>订单信息</h3>

        <Table
          dataSource={orders}
          columns={orderColumns}
          rowKey="id"
        />
      </Col>
    </Row>
  </div>
));
