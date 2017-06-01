import React from 'react';
import { setDisplayName, compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Message } from 'antd';

import {
  updateAll as updateAllBannersAction,
} from 'shared/entities/actions/shop-banner';
import Form from 'shared/components/banner/banner-form';

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
        Message.success('编辑横幅成功！');
      }),
  }),
)(({ update, initialValues }) => (
  <div>
    <Form
      onSubmit={update}
      listLink="/shop/banner/list"
      initialValues={initialValues}
    />
  </div>
));
