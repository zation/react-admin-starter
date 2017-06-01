import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';

import { ROLE } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
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
)(({ onSubmit, handleSubmit, submitting, reset }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <Field
      name="name"
      label="权限组名称"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="operations"
      label="权限"
      component={Select}
      options={operationGroupOptions}
      required
      validate={required}
      multiple
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
      &nbsp;&nbsp;
      <Button onClick={reset}>重置</Button>
    </Item>
  </Form>
));
