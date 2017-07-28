import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';
import Link from 'shared/components/link';

import { SHIPPING } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
import Input from 'shared/components/fields/input';
import Select from 'shared/components/fields/select';
import { shippingCompanyOptions } from 'shared/constants/shipping-company';
import { required } from 'shared/validations';

const { Item } = Form;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const operatorLayout = {
  wrapperCol: { span: 18, offset: 6 },
};

export default compose(
  setPropTypes({
    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: SHIPPING,
  }),
)(({ onSubmit, handleSubmit, submitting }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <Field
      name="shippingCompany"
      label="Shipping Company"
      component={Select}
      options={shippingCompanyOptions}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="shippingNumber"
      label="Shipping Number"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to="/shop/order/list">Back</Link>
      </Button>
    </Item>
  </Form>
));
