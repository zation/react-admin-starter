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
  readAll as readAllBanners,
} from 'shared/entities/actions/banner';
import {
  readAll as readAllShopBanners,
} from 'shared/entities/actions/shop-banner';
import {
  readOne as readShippingFee,
} from 'shared/entities/actions/shipping-fee';
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
import asyncEnterHandler from 'shared/utils/async-enter-handler';
import Layout from 'modules/layout/containers/layout';
import Profile from 'modules/account/containers/profile';

import createSystemRoutes from 'modules/system/create-routes';
import createAuthRoutes from 'modules/auth/create-routes';
import createArticleRoutes from 'modules/content/create-routes';
import createAccountRoutes from 'modules/account/create-routes';
import createAssetRoutes from 'modules/asset/create-routes';
import createShopRoutes from 'modules/shop/create-routes';

export default store => [
  createAuthRoutes(store), {
    path: '/',
    component: Layout,
    onEnter: asyncEnterHandler(() => {
      const { dispatch } = store;

      return dispatch(readMineUser())
        .then(() => Promise.all([
          dispatch(readAllUsers()),
          dispatch(readAllRoles()),
          dispatch(readAllContents()),
          dispatch(readAllBanners()),
          dispatch(readAllShopBanners()),
          dispatch(readShippingFee()),
          dispatch(readAllProductCategories()),
          dispatch(readAllProducts()),
          dispatch(readAllCoupons()),
          dispatch(readAllOrders()),
        ]));
    }),
    indexRoute: {
      component: Profile,
    },
    childRoutes: [
      createSystemRoutes(store),
      createArticleRoutes(store),
      createAccountRoutes(store),
      createAssetRoutes(store),
      createShopRoutes(store),
    ],
  }];
