import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';

import { ROLE } from 'shared/constants/form-name';
import Input from 'shared/components/fields/input';
import Select from 'shared/components/fields/select';
import { required } from 'shared/validations';
import { operationGroupOptions } from 'shared/constants/operation-group';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const operatorLayout = {
  wrapperCol: { span: 10, offset: 8 },
};

export default compose(
  reduxForm({
    form: ROLE,
    enableReinitialize: true,
  }),
  setPropTypes({
    isEdit: PropTypes.bool,

    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
)(({ handleSubmit, submitting, reset }) => (
  <Form
    onSubmit={handleSubmit}
  >
    <Field
      name="name"
      label="Name"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="operations"
      label="Operations"
      component={Select}
      options={operationGroupOptions}
      required
      validate={required}
      mode="multiple"
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;
      <Button onClick={reset}>Reset</Button>
    </Item>
  </Form>
));
