import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import { updateShipping as updateShippingAction } from 'shared/entities/actions/order';
import Layout from 'shared/containers/layout';
import Detail from '../../components/order-detail';
import selector from './order-editor-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    updateShipping: updateShippingAction,
  }),
  withHandlers({
    updateShipping: ({ updateShipping, order }) => (values) =>
      updateShipping({ id: order.id, ...values })
        .then(() => Message.success('Edit shipping info success!')),
  }),
)(({ order, updateShipping }) => (
  <Layout>
    <Detail order={order} isEditing updateShipping={updateShipping} />
  </Layout>
));
