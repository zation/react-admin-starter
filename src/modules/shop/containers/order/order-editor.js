import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import { updateShipping as updateShippingAction } from 'shared/entities/actions/order';
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
        .then(() => Message.success('编辑快递信息成功！')),
  }),
)(({ order, updateShipping }) => (
  <Detail order={order} isEditing updateShipping={updateShipping} />
));
