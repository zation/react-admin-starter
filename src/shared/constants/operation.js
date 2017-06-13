import { keys } from 'lodash/fp';

export const MANAGE_ADMIN = 'MANAGE_ADMIN';
export const MANAGE_CUSTOMER = 'MANAGE_CUSTOMER';
export const MANAGE_ROLE = 'MANAGE_ROLE';
export const CREATE_CONTENT = 'CREATE_CONTENT';
export const MANAGE_CONTENT = 'MANAGE_CONTENT';
export const MANAGE_PROFILE = 'MANAGE_PROFILE';
export const MANAGE_PASSWORD = 'MANAGE_PASSWORD';
export const MANAGE_SHOP_BANNER = 'MANAGE_SHOP_BANNER';
export const MANAGE_PRODUCT_CATEGORY = 'MANAGE_PRODUCT_CATEGORY';
export const MANAGE_PRODUCT = 'MANAGE_PRODUCT';
export const MANAGE_COUPON = 'MANAGE_COUPON';
export const MANAGE_ORDER = 'MANAGE_ORDER';

const textMap = {
  [MANAGE_ADMIN]: 'Admin Management',
  [MANAGE_CUSTOMER]: 'Customer Management',
  [MANAGE_ROLE]: 'Role Management',
  [CREATE_CONTENT]: 'Create Content',
  [MANAGE_CONTENT]: 'Content List',
  [MANAGE_PROFILE]: 'Profile',
  [MANAGE_PASSWORD]: 'Password',
  [MANAGE_SHOP_BANNER]: 'Banner',
  [MANAGE_PRODUCT_CATEGORY]: 'Product Category',
  [MANAGE_PRODUCT]: 'Product',
  [MANAGE_COUPON]: 'Coupon',
  [MANAGE_ORDER]: 'Order',
};

const linkMap = {
  [MANAGE_ADMIN]: '/system/admin/list',
  [MANAGE_CUSTOMER]: '/system/customer/list',
  [MANAGE_ROLE]: '/system/role/list',
  [CREATE_CONTENT]: '/content/create',
  [MANAGE_CONTENT]: '/content/list',
  [MANAGE_PROFILE]: '/account/profile',
  [MANAGE_PASSWORD]: '/account/password',
  [MANAGE_SHOP_BANNER]: '/shop/banner/list',
  [MANAGE_PRODUCT_CATEGORY]: '/shop/category/list',
  [MANAGE_PRODUCT]: '/shop/product/list',
  [MANAGE_COUPON]: '/shop/coupon/list',
  [MANAGE_ORDER]: '/shop/order/list',
};

export const getOperationText = operation => textMap[operation];

export const getOperationLink = operation => linkMap[operation];

export const operations = keys(textMap);
