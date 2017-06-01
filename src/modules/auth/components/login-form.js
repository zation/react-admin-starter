import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import { required, minLength } from 'shared/validations';
import { LOGIN } from 'shared/constants/form-name';
import Input from 'shared/components/fields/input';
import submit from 'shared/utils/submit-handler';

import style from './form.less';

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
    form: LOGIN,
  }),
)(({ onSubmit, handleSubmit, reset, submitting }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
    className={style.Root}
  >
    <Field
      name="username"
      component={Input}
      label="用户名"
      type="text"
      placeholder="请输入用户名"
      layout={layout}
      validate={[required, minLength(6)]}
    />
    <Field
      name="password"
      component={Input}
      label="密码"
      type="password"
      placeholder="请输入密码"
      layout={layout}
      validate={required}
    />
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="ghost" onClick={reset}>重置</Button>
    </Item>
  </Form>
));
