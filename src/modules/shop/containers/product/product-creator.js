import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';
import { push as pushAction } from 'shared/entities/actions/history';
import Layout from 'shared/containers/layout';

import { create as createProductAction } from 'shared/entities/actions/product';
import Form from '../../components/product-form';
import selector from './product-creator-selector';

export default compose(
  connect(selector, {
    createProduct: createProductAction,
    push: pushAction,
  }),
  setDisplayName(__filename),
  withHandlers({
    onSubmit: ({ createProduct, push }) => values => createProduct(values).then(() => {
      Message.success('Create product success!');
      push('/shop/product/list');
    }),
  }),
)(({
  onSubmit,
  productCategoryOptions,
  initialValues,
}) => (
  <Layout>
    <Form
      onSubmit={onSubmit}
      productCategoryOptions={productCategoryOptions}
      initialValues={initialValues}
    />
  </Layout>
));
