import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import { required, samePasswordAs } from 'shared/validations';
import { REGISTER } from 'shared/constants/form-name';
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
    form: REGISTER,
  }),
)(({ onSubmit, handleSubmit, reset, submitting }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
    className={style.Root}
  >
    <Field
      name="username"
      component={Input}
      label="Username"
      type="text"
      placeholder="Please input username"
      layout={layout}
      validate={required}
    />
    <Field
      name="password"
      component={Input}
      label="Password"
      type="password"
      placeholder="Please input password"
      layout={layout}
      validate={required}
    />
    <Field
      name="confirmedPassword"
      component={Input}
      label="Repeat Password"
      type="password"
      placeholder="Please make sure you input the same password"
      layout={layout}
      validate={[required, samePasswordAs('password')]}
    />
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="ghost" onClick={reset}>Reset</Button>
    </Item>
  </Form>
));
