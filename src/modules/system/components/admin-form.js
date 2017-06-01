import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';

import { ADMIN } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
import Input from 'shared/components/fields/input';
import RadioGroup from 'shared/components/fields/radio-group';
import PlainText from 'shared/components/fields/plain-text';
import { userStatusOptions } from 'shared/constants/user-status';
import { required, samePasswordAs } from 'shared/validations';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const operatorLayout = {
  wrapperCol: { span: 10, offset: 8 },
};

export default compose(
  setPropTypes({
    roleOptions: PropTypes.array.isRequired,
    isEdit: PropTypes.bool,

    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: ADMIN,
    enableReinitialize: true,
  }),
)(({ onSubmit, handleSubmit, submitting, reset, roleOptions, isEdit }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    {isEdit
      ? (
        <Field
          name="username"
          label="用户名"
          component={PlainText}
          layout={layout}
        />
      ) : (
        <Field
          name="username"
          label="用户名"
          component={Input}
          type="text"
          required
          validate={required}
          layout={layout}
        />
      )}
    <Field
      name="nickname"
      label="昵称"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="email"
      label="Email"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    {isEdit ? null : <Field
      name="password"
      label="密码"
      component={Input}
      type="password"
      required
      validate={required}
      layout={layout}
    />}
    {isEdit ? null : <Field
      name="confirmedPassword"
      label="重复密码"
      component={Input}
      type="password"
      required
      validate={[required, samePasswordAs('password')]}
      layout={layout}
    />}
    <Field
      name="status"
      label="激活状态"
      component={RadioGroup}
      options={userStatusOptions}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="roleKey"
      label="权限组"
      component={RadioGroup}
      options={roleOptions}
      required
      validate={required}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
      &nbsp;&nbsp;
      <Button onClick={reset}>重置</Button>
    </Item>
  </Form>
));
