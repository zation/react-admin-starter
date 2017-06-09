import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import {
  update as updateCouponAction,
} from 'shared/entities/actions/coupon';
import selector from './coupon-editor-selector';
import Form from '../../components/coupon-form';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    updateCoupon: updateCouponAction,
  }),
  withHandlers({
    updateCoupon: ({ updateCoupon, couponId }) => (value) =>
      updateCoupon({
        id: couponId,
        ...value,
      }).then(() => {
        Message.success('编辑礼卷成功！');
      }),
  }),
)(({ initialValues, updateCoupon, name, type, code }) => (
  <div>
    <Form
      isEditing
      name={name}
      type={type}
      code={code}
      initialValues={initialValues}
      onSubmit={updateCoupon}
    />
  </div>
));
