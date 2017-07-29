import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import handleSubmitError from 'shared/utils/handle-submit-error';

import { required, samePasswordAs } from 'shared/validations';
import { PASSWORD } from 'shared/constants/form-name';
import Input from 'shared/components/fields/input';

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
    form: PASSWORD,
  }),
)(({ handleSubmit, submitting }) => (
  <Form
    onSubmit={handleSubmit}
  >
    <Field
      name="oldPassword"
      component={Input}
      label="Old Password"
      type="password"
      layout={layout}
      validate={required}
    />
    <Field
      name="newPassword"
      component={Input}
      label="New Password"
      type="password"
      layout={layout}
      validate={required}
    />
    <Field
      name="confirmedNewPassword"
      component={Input}
      label="Repeat Password"
      type="password"
      layout={layout}
      validate={[required, samePasswordAs('newPassword')]}
    />
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
    </Item>
  </Form>
));
