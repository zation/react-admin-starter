import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';
import Link from 'shared/components/link';

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
      label="Title"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="cover"
      label="Cover"
      component={SingleUploader}
      accept="image/*"
      style={{ width: 450, height: 225 }}
      required
      validate={required}
      layout={layout}
      extraText="Suggested size: 540 x 400"
    />
    <Field
      name="author"
      label="Author"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="externalLink"
      label="External Link"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="tags"
      label="Tags"
      component={Select}
      options={contentTagOptions}
      mode="tags"
      layout={layout}
    />
    <Field
      name="isRecommended"
      label="Recommendation"
      component={RadioGroup}
      options={[{
        value: true,
        text: 'Yes',
      }, {
        value: false,
        text: 'No',
      }]}
      layout={layout}
    />
    <Field
      name="status"
      label="Publish"
      component={RadioGroup}
      options={[{
        value: PUBLISHED,
        text: 'Yes',
      }, {
        value: DRAFT,
        text: 'No',
      }]}
      layout={layout}
    />

    <Item {...operatorLayout} >
      <Button type="primary" htmlType="submit" loading={submitting}>Submit</Button>
      &nbsp;&nbsp;
      <Button>
        <Link to="/content/list">Back</Link>
      </Button>
    </Item>
  </Form>
));
