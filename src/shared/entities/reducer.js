import { combineReducers } from 'redux';

import serverError from './reducers/server-error';
import auth from './reducers/auth';
import user from './reducers/user';
import role from './reducers/role';
import content from './reducers/content';
import contentTag from './reducers/content-tag';
import shopBanner from './reducers/shop-banner';
import productCategory from './reducers/product-category';
import product from './reducers/product';
import coupon from './reducers/coupon';
import order from './reducers/order';
import history from './reducers/history';

export default {
  entities: combineReducers({
    ...serverError,
    ...auth,
    ...user,
    ...role,
    ...content,
    ...contentTag,
    ...shopBanner,
    ...productCategory,
    ...product,
    ...coupon,
    ...order,
    ...history,
  }),
};
