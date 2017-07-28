import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import Layout from 'shared/containers/layout';

import {
  remove as removeProductCategoryAction,
  update as updateProductCategoryAction,
  create as createProductCategoryAction,
} from 'shared/entities/actions/product-category';
import selector from './category-list-selector';
import List from '../components/category-list';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    removeProductCategory: removeProductCategoryAction,
    updateProductCategory: updateProductCategoryAction,
    createProductCategory: createProductCategoryAction,
  }),
)(({ categories, removeProductCategory, updateProductCategory, createProductCategory }) => (
  <Layout>
    <List
      categories={categories}
      removeProductCategory={removeProductCategory}
      updateProductCategory={updateProductCategory}
      createProductCategory={createProductCategory}
    />
  </Layout>
));
