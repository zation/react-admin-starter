import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';

import { ADMIN } from 'shared/constants/form-name';
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
)(({ handleSubmit, submitting, reset, roleOptions, isEdit }) => (
  <Form
    onSubmit={handleSubmit}
  >
    {isEdit
      ? (
        <Field
          name="username"
          label="Username"
          component={PlainText}
          layout={layout}
        />
      ) : (
        <Field
          name="username"
          label="Username"
          component={Input}
          type="text"
          required
          validate={required}
          layout={layout}
        />
      )}
    <Field
      name="nickname"
      label="Nickname"
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
      label="Password"
      component={Input}
      type="password"
      required
      validate={required}
      layout={layout}
    />}
    {isEdit ? null : <Field
      name="confirmedPassword"
      label="Repeat Password"
      component={Input}
      type="password"
      required
      validate={[required, samePasswordAs('password')]}
      layout={layout}
    />}
    <Field
      name="status"
      label="Status"
      component={RadioGroup}
      options={userStatusOptions}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="roleKey"
      label="Role"
      component={RadioGroup}
      options={roleOptions}
      required
      validate={required}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;
      <Button onClick={reset}>Reset</Button>
    </Item>
  </Form>
));
