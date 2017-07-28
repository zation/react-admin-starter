import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';
import Link from 'shared/components/link';

import { COUPON } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
import PlainText from 'shared/components/fields/plain-text';
import InputNumber from 'shared/components/fields/input-number';
import DatePicker from 'shared/components/fields/date-picker';
import { required } from 'shared/validations';
import { FIXED, PERCENTAGE, getCouponTypeText } from 'shared/constants/coupon-type';

const { Item } = Form;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const operatorLayout = {
  wrapperCol: { span: 22, offset: 2 },
};

export default compose(
  setPropTypes({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    code: PropTypes.string,
    isEditing: PropTypes.bool,

    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: COUPON,
  }),
)(({ onSubmit, handleSubmit, submitting, type, name, code, isEditing }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <PlainText
      label="Name"
      layout={layout}
      input={{ value: name }}
    />
    <PlainText
      label="Type"
      layout={layout}
      input={{ value: getCouponTypeText(type) }}
    />
    {isEditing ? (
      <div>
        <PlainText
          label="Code"
          layout={layout}
          input={{ value: code }}
        />
        <Field
          name="inventory"
          label="Inventory"
          component={PlainText}
          required
          layout={layout}
        />
      </div>
    ) : (
      <div>
        {type === FIXED ? (
          <Field
            name="condition"
            label="More than"
            component={InputNumber}
            required
            validate={required}
            layout={layout}
          />
        ) : null}
        {type === PERCENTAGE ? (
          <Field
            name="discount"
            label="Discount"
            component={InputNumber}
            extraText="%"
            required
            validate={required}
            layout={layout}
            format={value => value && value * 100}
            parse={value => Number(value) / 100}
          />
        ) : (
          <Field
            name="discount"
            label="reduce"
            component={InputNumber}
            required
            validate={required}
            layout={layout}
          />
        )}
      </div>
    )}
    <Field
      name="capacity"
      label="Capacity"
      component={InputNumber}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="expiredAt"
      label="Expire Time"
      component={DatePicker}
      required
      validate={required}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to="/shop/coupon/list">Back</Link>
      </Button>
    </Item>
  </Form>
));
