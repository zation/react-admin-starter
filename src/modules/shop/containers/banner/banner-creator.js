import React from 'react';
import { setDisplayName, compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Message } from 'antd';
import { Link } from 'react-router';
import { push as pushAction } from 'react-router-redux';

import {
  updateAll as updateAllBannersAction,
} from 'shared/entities/actions/shop-banner';
import Form from '../../components/banner-form';

import selector from './banner-creator-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    updateAllBanners: updateAllBannersAction,
    push: pushAction,
  }),
  withHandlers({
    create: ({ updateAllBanners, banners, maxOrder, push }) => (values) =>
      updateAllBanners([
        ...banners, {
          ...values,
          order: maxOrder + 1,
        },
      ]).then(() => {
        Message.success('创建横幅成功！');
        push('/shop/banner/list');
      }),
  }),
)(({ create }) => (
  <div>
    <Button type="primary" style={{ marginBottom: 10 }} size="large">
      <Link to="/shop/banner/create">添加横幅</Link>
    </Button>

    <Form
      onSubmit={create}
      listLink="/shop/banner/list"
    />
  </div>
));
