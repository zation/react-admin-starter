import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes, pure } from 'recompose';
import { Form, Button } from 'antd';
import { Link } from 'react-router';

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
      label="图片"
      component={SingleUploader}
      style={{ width: 450, height: 225 }}
      accept="image/*"
      required
      validate={required}
      layout={layout}
      extraText="建议图片尺寸：宽 1920px，高 420px"
    />
    <Field
      name="link"
      label="链接"
      component={Input}
      type="text"
      layout={layout}
    />
    <Field
      name="target"
      label="打开方式"
      component={Select}
      options={linkTargetOptions}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to={listLink}>返回列表</Link>
      </Button>
    </Item>
  </Form>
));
