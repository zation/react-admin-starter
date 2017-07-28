import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Message } from 'antd';
import Link from 'shared/components/link';
import Layout from 'shared/containers/layout';

import {
  remove as removeProductAction,
  update as updateProductAction,
} from 'shared/entities/actions/product';
import { PUBLISHED, DRAFT } from 'shared/constants/product-status';
import Stats from 'shared/components/stats';
import selector from './product-list-selector';
import List from '../../components/product-list';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    removeProduct: removeProductAction,
    updateProduct: updateProductAction,
  }),
  withHandlers({
    toggleProductStatus: ({ updateProduct }) => ({ id, status }) => () => updateProduct({
      id,
      status: status === PUBLISHED ? DRAFT : PUBLISHED,
    }).then(() => {
      Message.success('Update status success!');
    }),
    toggleRecommendation: ({ updateProduct }) => ({ id, isRecommended }) => () => updateProduct({
      id,
      isRecommended: !isRecommended,
    }).then(() => {
      Message.success('Update recommendation success!');
    }),
  }),
)(({ products, removeProduct, toggleProductStatus, toggleRecommendation, statsItems }) => (
  <Layout>
    <Stats items={statsItems} />

    <div style={{ marginBottom: -30 }}>
      <Button type="primary" size="large">
        <Link to="/shop/product/create">Create Product</Link>
      </Button>
    </div>
    <List
      products={products}
      removeProduct={removeProduct}
      toggleProductStatus={toggleProductStatus}
      toggleRecommendation={toggleRecommendation}
    />
  </Layout>
));
