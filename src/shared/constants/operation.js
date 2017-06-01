import { keys } from 'lodash/fp';

export const MANAGE_ADMIN = 'MANAGE_ADMIN';
export const MANAGE_CUSTOMER = 'MANAGE_CUSTOMER';
export const MANAGE_ROLE = 'MANAGE_ROLE';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const MANAGE_ARTICLE = 'MANAGE_ARTICLE';
export const MANAGE_PROFILE = 'MANAGE_PROFILE';
export const MANAGE_PASSWORD = 'MANAGE_PASSWORD';
export const MANAGE_BANNER = 'MANAGE_BANNER';
export const MANAGE_SHOP_BANNER = 'MANAGE_SHOP_BANNER';
export const MANAGE_SHIPPING_FEE = 'MANAGE_SHIPPING_FEE';
export const MANAGE_PRODUCT_CATEGORY = 'MANAGE_PRODUCT_CATEGORY';
export const MANAGE_PRODUCT = 'MANAGE_PRODUCT';
export const MANAGE_COUPON = 'MANAGE_COUPON';
export const MANAGE_ORDER = 'MANAGE_ORDER';

const textMap = {
  [MANAGE_ADMIN]: '后台帐号管理',
  [MANAGE_CUSTOMER]: '用户管理',
  [MANAGE_ROLE]: '权限管理',
  [CREATE_ARTICLE]: '新建文章',
  [MANAGE_ARTICLE]: '文章列表',
  [MANAGE_PROFILE]: '编辑帐号信息',
  [MANAGE_PASSWORD]: '修改密码',
  [MANAGE_BANNER]: '横幅设置',
  [MANAGE_SHOP_BANNER]: '商城横幅设置',
  [MANAGE_SHIPPING_FEE]: '订单邮费设置',
  [MANAGE_PRODUCT_CATEGORY]: '类型管理',
  [MANAGE_PRODUCT]: '商品管理',
  [MANAGE_COUPON]: '礼券管理',
  [MANAGE_ORDER]: '订单管理',
};

const linkMap = {
  [MANAGE_ADMIN]: 'system/admin/list',
  [MANAGE_CUSTOMER]: 'system/customer/list',
  [MANAGE_ROLE]: 'system/role/list',
  [CREATE_ARTICLE]: 'content/article/create',
  [MANAGE_ARTICLE]: 'content/article/list',
  [MANAGE_PROFILE]: 'account/profile',
  [MANAGE_PASSWORD]: 'account/password',
  [MANAGE_BANNER]: 'asset/banner/list',
  [MANAGE_SHOP_BANNER]: 'shop/banner/list',
  [MANAGE_SHIPPING_FEE]: 'shop/shipping-fee',
  [MANAGE_PRODUCT_CATEGORY]: 'shop/category/list',
  [MANAGE_PRODUCT]: 'shop/product/list',
  [MANAGE_COUPON]: 'shop/coupon/list',
  [MANAGE_ORDER]: 'shop/order/list',
};

export const getOperationText = operation => textMap[operation];

export const getOperationLink = operation => linkMap[operation];

export const operations = keys(textMap);
