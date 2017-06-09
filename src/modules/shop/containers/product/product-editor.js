import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import { update as updateProductAction } from 'shared/entities/actions/product';
import Form from '../../components/product-form';
import selector from './product-editor-selector';

export default compose(
  connect(selector, {
    updateProduct: updateProductAction,
  }),
  setDisplayName(__filename),
  withHandlers({
    onSubmit: ({ updateProduct, productId }) => (values) => updateProduct({
      ...values,
      id: productId,
    }).then(() => {
      Message.success('Edit product success!');
    }),
  }),
)(({ onSubmit, initialValues, productCategoryOptions }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    productCategoryOptions={productCategoryOptions}
  />
));
