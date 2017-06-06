import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Row, Col, Button } from 'antd';
import { Link } from 'react-router';

import List from 'shared/components/list';
import { getOrderStatusText } from 'shared/constants/order-status';
import { getShippingCompanyText } from 'shared/constants/shipping-company';
import { price } from 'shared/utils/formatter';
import ShippingForm from './shipping-form';

const columns = [{
  title: '商品名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '单价',
  dataIndex: 'unitPrice',
  key: 'unitPrice',
  render: price(),
}, {
  title: '数量',
  dataIndex: 'quantity',
  key: 'quantity',
}];

const paymentInfoItems = [{
  title: '商品总额',
  dataIndex: 'total',
  render: price(),
}, {
  title: '运费',
  dataIndex: 'shippingFee',
  render: price(),
}, {
  title: '优惠券抵扣',
  render: ({ subTotal, total }) => price()(subTotal - total),
}, {
  title: '应付总额',
  dataIndex: 'grandTotal',
  render: price(),
}];

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    order: PropTypes.object.isRequired,
    backUrl: PropTypes.string,
    isEditing: PropTypes.bool,

    updateShipping: PropTypes.func,
  }),
  withProps(({ isEditing }) => ({
    items: [{
      title: '订单号',
      dataIndex: 'orderNo',
    }, {
      title: '订单名称',
      dataIndex: 'name',
    }, {
      title: '备注',
      dataIndex: 'comment',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (
        orderStatus,
        { payment: { status: paymentStatus }, shippingCompany, shippingNumber },
      ) => getOrderStatusText(orderStatus, paymentStatus, shippingCompany, shippingNumber),
    }, {
      title: '用户',
      dataIndex: 'user.username',
    }, {
      title: '收货姓名',
      dataIndex: 'receiverName',
    }, {
      title: '收货电话',
      dataIndex: 'receiverPhone',
    }, {
      title: '收货地址',
      dataIndex: 'receiverAddress',
    }, ...(isEditing ? [] : [{
      title: '快递公司',
      dataIndex: 'shippingCompany',
      render: getShippingCompanyText,
    }, {
      title: '快递单号',
      dataIndex: 'shippingNumber',
    }])],
  })),
)(({ order, backUrl = '/shop/order/list', items, updateShipping, isEditing }) => (
  <div>
    {isEditing ? (
      <Row>
        <Col span={16} offset={4}>
          <h3 style={{ margin: '10px 0' }}>编辑快递信息</h3>
          <ShippingForm onSubmit={updateShipping} initialValues={order} />
        </Col>
      </Row>
    ) : null}
    <List
      title="基本信息"
      dataSource={order}
      items={items}
      labelLayout={{ span: 4, offset: 4 }}
    />
    <Row>
      <Col span={16} offset={4}>
        <h3 style={{ margin: '10px 0' }}>商品信息</h3>
        <Table
          columns={columns}
          dataSource={order.items}
          rowKey="id"
          footer={() => (
            <List
              dataSource={order}
              items={paymentInfoItems}
              labelLayout={{ span: 4, offset: 16 }}
              valueLayout={{ span: 4 }}
            />
          )}
        />
      </Col>
    </Row>
    <Row>
      <Col span={16} offset={4}>
        <Button>
          <Link to={backUrl}>返回</Link>
        </Button>
      </Col>
    </Row>
  </div>
));
