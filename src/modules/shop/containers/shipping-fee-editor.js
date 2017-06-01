import React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { Message } from 'antd';

import { update as updateShippingFeeAction } from 'shared/entities/actions/shipping-fee';
import Form from '../components/shipping-fee-form';
import selector from './shipping-fee-selector';

export default compose(
  connect(
    selector, {
      update: updateShippingFeeAction,
    },
  ),
  withHandlers({
    update: ({ update }) => (values) =>
      update(values).then(() => Message.success('设置订单邮费信息成功！')),
  }),
  setDisplayName(__filename),
)(({ update, initialValues }) => (
  <Form onSubmit={update} initialValues={initialValues} />
));
