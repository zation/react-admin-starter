import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import {
  close as closeOrderAction,
  complete as completeOrderAction,
} from 'shared/entities/actions/order';
import Stats from 'shared/components/stats';
import Layout from 'shared/containers/layout';
import selector from './order-list-selector';
import List from '../../components/order-list';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    closeOrder: closeOrderAction,
    completeOrder: completeOrderAction,
  }),
  withHandlers({
    closeOrder: ({ closeOrder }) => ({ id }) => () =>
      closeOrder({ id }).then(() => Message.success('Close order success!')),
    completeOrder: ({ completeOrder }) => ({ id }) => () =>
      completeOrder({ id }).then(() => Message.success('Complete order success!')),
  }),
)(({ orders, closeOrder, completeOrder, statsItems }) => (
  <Layout>
    <Stats items={statsItems} />

    <List
      orders={orders}
      completeOrder={completeOrder}
      closeOrder={closeOrder}
    />
  </Layout>
));
