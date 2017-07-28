import React from 'react';
import { setDisplayName, compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Link from 'shared/components/link';
import { map, flow, reject, propEq } from 'lodash/fp';

import {
  updateAll as updateAllBannersAction,
} from 'shared/entities/actions/shop-banner';
import List from '../../components/banner-list';

import selector from './banner-list-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    updateAllBanners: updateAllBannersAction,
  }),
  withHandlers({
    forward: ({ updateAllBanners, banners }) => ({ order }) => () =>
      updateAllBanners(map(banner => {
        if (banner.order === order) {
          return { ...banner, order: order - 1 };
        }
        if (banner.order === order - 1) {
          return { ...banner, order };
        }
        return banner;
      })(banners)),
    backward: ({ updateAllBanners, banners }) => ({ order }) => () =>
      updateAllBanners(map(banner => {
        if (banner.order === order) {
          return { ...banner, order: order + 1 };
        }
        if (banner.order === order + 1) {
          return { ...banner, order };
        }
        return banner;
      })(banners)),
    remove: ({ updateAllBanners, banners }) => ({ order }) => () =>
      updateAllBanners(flow(
        reject(propEq('order', order)),
        map(banner => {
          if (banner.order > order) {
            return { ...banner, order: banner.order - 1 };
          }
          return banner;
        }),
      )(banners)),
  }),
)(({ banners, forward, backward, remove }) => (
  <div>
    <Button type="primary" style={{ marginBottom: 10 }} size="large">
      <Link to="/shop/banner/create">Create</Link>
    </Button>

    <List
      banners={banners}
      forward={forward}
      backward={backward}
      remove={remove}
      editLink="/shop/banner/edit"
    />
  </div>
));
