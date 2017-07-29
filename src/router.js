import { createElement } from 'react';
import Router from 'universal-router';
import {
  readMine as readMineUser,
  readAll as readAllUsers,
} from 'shared/entities/actions/user';
import {
  readAll as readAllContents,
} from 'shared/entities/actions/content';
import {
  readAll as readAllRoles,
} from 'shared/entities/actions/role';
import {
  readAll as readAllShopBanners,
} from 'shared/entities/actions/shop-banner';
import {
  readAll as readAllProductCategories,
} from 'shared/entities/actions/product-category';
import {
  readAll as readAllProducts,
} from 'shared/entities/actions/product';
import {
  readAll as readAllCoupons,
} from 'shared/entities/actions/coupon';
import {
  readAll as readAllOrders,
} from 'shared/entities/actions/order';
import { isEntityEmpty } from 'shared/entities/get-entity';
import { flow, filter, map } from 'lodash/fp';

import Profile from 'modules/account/containers/profile';

import authRoutes from 'modules/auth/routes';
import systemRoutes from 'modules/system/routes';
import contentRoutes from 'modules/content/routes';
import accountRoutes from 'modules/account/routes';
import shopRoutes from 'modules/shop/routes';

const preloadEntities = [{
  name: 'user',
  action: readAllUsers,
}, {
  name: 'role',
  action: readAllRoles,
}, {
  name: 'content',
  action: readAllContents,
}, {
  name: 'shopBanner',
  action: readAllShopBanners,
}, {
  name: 'productCategory',
  action: readAllProductCategories,
}, {
  name: 'product',
  action: readAllProducts,
}, {
  name: 'coupon',
  action: readAllCoupons,
}, {
  name: 'order',
  action: readAllOrders,
}];

export default new Router([
  authRoutes, {
    path: '/',
    onEnter: async ({ store: { dispatch, getState } }) => {
      const state = getState();
      if (isEntityEmpty('auth.currentUserId')(state)) {
        await dispatch(readMineUser());
      }

      await Promise.all(
        flow(
          filter(({ name }) => isEntityEmpty(name)(state)),
          map(({ action }) => dispatch(action())),
        )(preloadEntities),
      );
    },
    children: [
      {
        path: '/',
        component: Profile,
      },
      systemRoutes,
      contentRoutes,
      accountRoutes,
      shopRoutes,
    ],
  },
], {
  async resolveRoute(context, params) {
    const { route: { onEnter, component } } = context;
    if (onEnter) {
      await onEnter(context, params);
    }
    if (component) {
      return createElement(component, context);
    }
    return null;
  },
});
