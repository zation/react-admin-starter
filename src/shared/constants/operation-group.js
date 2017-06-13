import { map } from 'lodash/fp';

import {
  getOperationText,
  getOperationLink,
  MANAGE_ADMIN,
  MANAGE_CUSTOMER,
  MANAGE_ROLE,
  CREATE_CONTENT,
  MANAGE_CONTENT,
  MANAGE_PROFILE,
  MANAGE_PASSWORD,
  MANAGE_SHOP_BANNER,
  MANAGE_PRODUCT_CATEGORY,
  MANAGE_PRODUCT,
  MANAGE_COUPON,
  MANAGE_ORDER,
} from './operation';

export const SYSTEM = 'SYSTEM';
export const CONTENT = 'CONTENT';
export const ACCOUNT = 'ACCOUNT';
export const SHOP = 'SHOP';

const textMap = {
  [SYSTEM]: 'System',
  [CONTENT]: 'Content',
  [ACCOUNT]: 'Account',
  [SHOP]: 'Shop',
};

export const getOperationGroupText = group => textMap[group];

const operationGroups = [{
  group: SYSTEM,
  children: [MANAGE_ADMIN, MANAGE_CUSTOMER, MANAGE_ROLE],
}, {
  group: CONTENT,
  children: [CREATE_CONTENT, MANAGE_CONTENT],
}, {
  group: SHOP,
  children: [
    MANAGE_SHOP_BANNER,
    MANAGE_PRODUCT_CATEGORY,
    MANAGE_PRODUCT,
    MANAGE_COUPON,
    MANAGE_ORDER,
  ],
}, {
  group: ACCOUNT,
  children: [MANAGE_PROFILE, MANAGE_PASSWORD],
}];

export const menu = map(({ group, children }) => ({
  key: group,
  text: getOperationGroupText(group),
  children: map(item => ({
    key: item,
    text: getOperationText(item),
    link: getOperationLink(item),
  }))(children),
}))(operationGroups);

export const operationGroupOptions = map(({ group, children }) => ({
  group: getOperationGroupText(group),
  children: map(item => ({
    value: item,
    text: getOperationText(item),
  }))(children),
}))(operationGroups);
