import React from 'react';
import { setDisplayName, compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Message } from 'antd';
import Link from 'shared/components/link';
import { push as pushAction } from 'shared/entities/actions/history';

import {
  updateAll as updateAllBannersAction,
} from 'shared/entities/actions/shop-banner';
import Layout from 'shared/containers/layout';
import Form from '../../components/banner-form';

import selector from './banner-creator-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    updateAllBanners: updateAllBannersAction,
    push: pushAction,
  }),
  withHandlers({
    create: ({ updateAllBanners, banners, maxOrder, push }) => values =>
      updateAllBanners([
        ...banners, {
          ...values,
          order: maxOrder + 1,
        },
      ]).then(() => {
        Message.success('Create banner success!');
        push('/shop/banner/list');
      }),
  }),
)(({ create }) => (
  <Layout>
    <Button type="primary" style={{ marginBottom: 10 }} size="large">
      <Link to="/shop/banner/create">Create</Link>
    </Button>

    <Form
      onSubmit={create}
      listLink="/shop/banner/list"
    />
  </Layout>
));
