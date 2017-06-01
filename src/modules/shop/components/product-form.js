import React, { PropTypes } from 'react';
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
      label="名称"
      component={Input}
      type="text"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="cover"
      label="封面"
      component={SingleUploader}
      style={{ width: 300, height: 300 }}
      accept="image/*"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="images"
      label="幻灯片"
      component={MultipleUploader}
      accept="image/*"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="contentImages"
      label="图集"
      component={MultipleUploader}
      accept="image/*"
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="price"
      label="销售价"
      component={InputNumber}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="originalPrice"
      label="原价"
      component={InputNumber}
      validate={greaterOrEqual('price', '原价不能小于销售价')}
      layout={layout}
    />
    <Field
      name="capacity"
      label="总量"
      component={InputNumber}
      required
      validate={required}
      layout={layout}
    />
    <Field
      name="productCategory.id"
      label="类别"
      component={Select}
      options={productCategoryOptions}
      required
      validate={required}
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
        <Link to="/shop/product/list">返回列表</Link>
      </Button>
    </Item>
  </Form>
));
