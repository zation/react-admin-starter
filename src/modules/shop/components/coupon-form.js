import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';
import { Link } from 'react-router';

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
      label="名称"
      layout={layout}
      input={{ value: name }}
    />
    <PlainText
      label="类型"
      layout={layout}
      input={{ value: getCouponTypeText(type) }}
    />
    {isEditing ? (
      <div>
        <PlainText
          label="兑换码"
          layout={layout}
          input={{ value: code }}
        />
        <Field
          name="inventory"
          label="库存"
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
            label="满"
            component={InputNumber}
            required
            validate={required}
            layout={layout}
          />
        ) : null}
        {type === PERCENTAGE ? (
          <Field
            name="discount"
            label="折扣"
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
            label="减"
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
      label="总量"
      component={InputNumber}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="expiredAt"
      label="过期时间"
      component={DatePicker}
      required
      validate={required}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to="/shop/coupon/list">返回列表</Link>
      </Button>
    </Item>
  </Form>
));
