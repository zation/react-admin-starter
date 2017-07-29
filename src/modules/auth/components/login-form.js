import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import { required, minLength } from 'shared/validations';
import { LOGIN } from 'shared/constants/form-name';
import Input from 'shared/components/fields/input';
import handleSubmitError from 'shared/utils/handle-submit-error';

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
  handleSubmitError,
  reduxForm({
    form: LOGIN,
  }),
)(({ handleSubmit, reset, submitting }) => (
  <Form
    onSubmit={handleSubmit}
    className={style.Root}
  >
    <Field
      name="username"
      component={Input}
      label="Username"
      type="text"
      placeholder="Please input username"
      layout={layout}
      validate={[required, minLength(6)]}
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
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="ghost" onClick={reset}>Reset</Button>
    </Item>
  </Form>
));
