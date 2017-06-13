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
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Price',
  dataIndex: 'unitPrice',
  key: 'unitPrice',
  render: price(),
}, {
  title: 'Quantity',
  dataIndex: 'quantity',
  key: 'quantity',
}];

const paymentInfoItems = [{
  title: 'Total',
  dataIndex: 'total',
  render: price(),
}, {
  title: 'Shipping Fee',
  dataIndex: 'shippingFee',
  render: price(),
}, {
  title: 'Discount',
  render: ({ subTotal, total }) => price()(subTotal - total),
}, {
  title: 'Grand Total',
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
      title: 'Order Number',
      dataIndex: 'orderNo',
    }, {
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Comment',
      dataIndex: 'comment',
    }, {
      title: 'Status',
      dataIndex: 'status',
      render: (
        orderStatus,
        { payment: { status: paymentStatus }, shippingCompany, shippingNumber },
      ) => getOrderStatusText(orderStatus, paymentStatus, shippingCompany, shippingNumber),
    }, {
      title: 'Username',
      dataIndex: 'user.username',
    }, {
      title: 'Receiver Name',
      dataIndex: 'receiverName',
    }, {
      title: 'Receiver Phone',
      dataIndex: 'receiverPhone',
    }, {
      title: 'Receiver Address',
      dataIndex: 'receiverAddress',
    }, ...(isEditing ? [] : [{
      title: 'Shipping Company',
      dataIndex: 'shippingCompany',
      render: getShippingCompanyText,
    }, {
      title: 'Shipping Number',
      dataIndex: 'shippingNumber',
    }])],
  })),
)(({ order, backUrl = '/shop/order/list', items, updateShipping, isEditing }) => (
  <div>
    {isEditing ? (
      <Row>
        <Col span={16} offset={4}>
          <h3 style={{ margin: '10px 0' }}>Edit Shipping Info</h3>
          <ShippingForm onSubmit={updateShipping} initialValues={order} />
        </Col>
      </Row>
    ) : null}
    <List
      title="Basic Info"
      dataSource={order}
      items={items}
      labelLayout={{ span: 4, offset: 4 }}
    />
    <Row>
      <Col span={16} offset={4}>
        <h3 style={{ margin: '10px 0' }}>Product Info</h3>
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
          <Link to={backUrl}>Back</Link>
        </Button>
      </Col>
    </Row>
  </div>
));
