import React from 'react';
import { setDisplayName, compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import {
  updateAll as updateAllBannersAction,
} from 'shared/entities/actions/shop-banner';
import Layout from 'shared/containers/layout';
import Form from '../../components/banner-form';

import selector from './banner-editor-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    updateAllBanners: updateAllBannersAction,
  }),
  withHandlers({
    update: ({ updateAllBanners, otherBanners, order }) => (values) =>
      updateAllBanners([
        ...otherBanners, {
          ...values,
          order,
        },
      ]).then(() => {
        Message.success('Edit banner success!');
      }),
  }),
)(({ update, initialValues }) => (
  <Layout>
    <Form
      onSubmit={update}
      listLink="/shop/banner/list"
      initialValues={initialValues}
    />
  </Layout>
));
