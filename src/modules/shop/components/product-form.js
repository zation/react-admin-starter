import PropTypes from 'prop-types';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import { Form, Button } from 'antd';
import { Link } from 'react-router';

import { PRODUCT } from 'shared/constants/form-name';
import submit from 'shared/utils/submit-handler';
import Input from 'shared/components/fields/input';
import InputNumber from 'shared/components/fields/input-number';
import RadioGroup from 'shared/components/fields/radio-group';
import Select from 'shared/components/fields/select';
import SingleUploader from 'shared/components/fields/single-uploader';
import MultipleUploader from 'shared/components/fields/multiple-uploader';
import { required, greaterOrEqual } from 'shared/validations';
import { DRAFT, PUBLISHED } from 'shared/constants/product-status';

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
    productCategoryOptions: PropTypes.array.isRequired,

    onSubmit: PropTypes.func.isRequired,
  }),
  setDisplayName(__filename),
  reduxForm({
    form: PRODUCT,
  }),
)(({ onSubmit, handleSubmit, submitting, productCategoryOptions }) => (
  <Form
    onSubmit={handleSubmit(submit(onSubmit))}
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
      name="cover"
      label="Cover"
      component={SingleUploader}
      style={{ width: 300, height: 300 }}
      accept="image/*"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="images"
      label="Gallery"
      component={MultipleUploader}
      accept="image/*"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="detail"
      label="Detail"
      component={Input}
      type="textarea"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="price"
      label="Sales Price"
      component={InputNumber}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="originalPrice"
      label="Original Price"
      component={InputNumber}
      validate={greaterOrEqual('price', 'Original price should less than sales price')}
      layout={layout}
    />
    <Field
      name="capacity"
      label="Capacity"
      component={InputNumber}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="productCategory.id"
      label="Category"
      component={Select}
      options={productCategoryOptions}
      required
      validate={required}
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
        <Link to="/shop/product/list">Back</Link>
      </Button>
    </Item>
  </Form>
));
