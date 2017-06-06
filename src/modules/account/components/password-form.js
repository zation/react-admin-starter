import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import { required, samePasswordAs } from 'shared/validations';
import { PASSWORD } from 'shared/constants/form-name';
import Input from 'shared/components/fields/input';
import submit from 'shared/utils/submit-handler';

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
    form: PASSWORD,
  }),
)(({ onSubmit, handleSubmit, submitting }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <Field
      name="oldPassword"
      component={Input}
      label="旧密码"
      type="password"
      layout={layout}
      validate={required}
    />
    <Field
      name="newPassword"
      component={Input}
      label="新密码"
      type="password"
      layout={layout}
      validate={required}
    />
    <Field
      name="confirmedNewPassword"
      component={Input}
      label="重复新密码"
      type="password"
      layout={layout}
      validate={[required, samePasswordAs('newPassword')]}
    />
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
    </Item>
  </Form>
));
