import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';
import { Link } from 'react-router';

import { CONTENT } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
import Input from 'shared/components/fields/input';
import RadioGroup from 'shared/components/fields/radio-group';
import Select from 'shared/components/fields/select';
import SingleUploader from 'shared/components/fields/single-uploader';
import { required } from 'shared/validations';
import { DRAFT, PUBLISHED } from 'shared/constants/content-status';

const { Item } = Form;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const operatorLayout = {
  wrapperCol: { span: 22, offset: 2 },
};

export default compose(
  setPropTypes({
    contentTagOptions: PropTypes.array.isRequired,

    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: CONTENT,
  }),
)(({ onSubmit, handleSubmit, submitting, contentTagOptions }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
  >
    <Field
      name="title"
      label="名称"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="cover"
      label="缩略图"
      component={SingleUploader}
      accept="image/*"
      style={{ width: 450, height: 225 }}
      required
      validate={required}
      layout={layout}
      extraText="推荐尺寸：高 540px，宽 400px"
    />
    <Field
      name="author"
      label="作者"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="externalLink"
      label="外部链接"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="tags"
      label="标签"
      component={Select}
      options={contentTagOptions}
      mode="tags"
      layout={layout}
    />
    <Field
      name="isRecommended"
      label="是否推荐"
      component={RadioGroup}
      options={[{
        value: true,
        text: '是',
      }, {
        value: false,
        text: '否',
      }]}
      layout={layout}
    />
    <Field
      name="status"
      label="是否发布"
      component={RadioGroup}
      options={[{
        value: PUBLISHED,
        text: '是',
      }, {
        value: DRAFT,
        text: '否',
      }]}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>确定</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to="/content/list">返回列表</Link>
      </Button>
    </Item>
  </Form>
));
