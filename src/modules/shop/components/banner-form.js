import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes, pure } from 'recompose';
import { Form, Button } from 'antd';
import Link from 'shared/components/link';

import { BANNER } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
import Input from 'shared/components/fields/input';
import Select from 'shared/components/fields/select';
import SingleUploader from 'shared/components/fields/single-uploader';
import { required } from 'shared/validations';
import { linkTargetOptions } from 'shared/constants/link-target';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
const operatorLayout = {
  wrapperCol: { span: 10, offset: 8 },
};

export default compose(
  pure,
  setPropTypes({
    onSubmit: PropTypes.func.isRequired,
    listLink: PropTypes.string.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: BANNER,
  }),
)(({ onSubmit, listLink, handleSubmit, submitting }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <Field
      name="image"
      label="Image"
      component={SingleUploader}
      style={{ width: 450, height: 225 }}
      accept="image/*"
      required
      validate={required}
      layout={layout}
      extraText="Suggested size: 1920 x 420"
    />
    <Field
      name="link"
      label="Link"
      component={Input}
      type="text"
      layout={layout}
    />
    <Field
      name="target"
      label="Target"
      component={Select}
      options={linkTargetOptions}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to={listLink}>Back</Link>
      </Button>
    </Item>
  </Form>
));
