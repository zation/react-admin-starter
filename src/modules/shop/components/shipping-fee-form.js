import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import { required } from 'shared/validations';
import { SHIPPING_FEE } from 'shared/constants/form-name';
import InputNumber from 'shared/components/fields/input-number';
import submit from 'shared/utils/submit-handler';
import { genderOptions } from 'shared/constants/gender';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};

export default compose(
  setPropTypes({
    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: SHIPPING_FEE,
  }),
)(({ onSubmit, handleSubmit, submitting }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <Field
      name="shippingFee"
      component={InputNumber}
      label="基础邮费"
      type="text"
      layout={layout}
      required
      validate={required}
    />
    <Field
      name="noShippingFeePrice"
      component={InputNumber}
      label="满额免邮限价"
      type="text"
      layout={layout}
      required
      validate={required}
    />
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
    </Item>
  </Form>
));
