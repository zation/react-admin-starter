import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'antd';
import { compose, setDisplayName, setPropTypes } from 'recompose';

import handleSubmitError from 'shared/utils/handle-submit-error';
import { required } from 'shared/validations';
import { PROFILE } from 'shared/constants/form-name';
import Input from 'shared/components/fields/input';
import RadioGroup from 'shared/components/fields/radio-group';
import { genderOptions } from 'shared/constants/gender';

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
    form: PROFILE,
  }),
)(({ handleSubmit, submitting }) => (
  <Form
    onSubmit={handleSubmit}
  >
    <Field
      name="nickname"
      component={Input}
      label="Nickname"
      type="text"
      layout={layout}
      validate={required}
    />
    <Field
      name="username"
      component={Input}
      label="Username"
      type="text"
      layout={layout}
      validate={required}
    />
    <Field
      name="gender"
      component={RadioGroup}
      options={genderOptions}
      label="Gender"
      layout={layout}
    />
    <Item
      wrapperCol={{ span: 12, offset: 8 }}
    >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
    </Item>
  </Form>
));
