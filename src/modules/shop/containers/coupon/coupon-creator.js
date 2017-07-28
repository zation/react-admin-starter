import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { push as pushAction } from 'shared/history';

import {
  create as createCouponAction,
} from 'shared/entities/actions/coupon';
import selector from './coupon-creator-selector';
import Form from '../../components/coupon-form';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    createCoupon: createCouponAction,
    push: pushAction,
  }),
  withHandlers({
    createCoupon: ({ createCoupon, push, name, type }) => (value) =>
      createCoupon({
        ...value,
        name,
        type,
      }).then(() => {
        Message.success('Create coupon success!');
        push('/shop/coupon/list');
      }),
  }),
)(({ type, name, createCoupon }) => (
  <div>
    <Form
      type={type}
      name={name}
      onSubmit={createCoupon}
    />
  </div>
));
