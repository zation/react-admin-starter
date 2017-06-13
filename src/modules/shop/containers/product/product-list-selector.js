import getEntity, { getEntityArray } from 'shared/entities/get-entity';
import { reject, flow, propEq, map, size, filter, prop } from 'lodash/fp';

import {
  DELETED,
  PUBLISHED,
  DRAFT,
  getProductStatusText,
} from 'shared/constants/product-status';
import { NUMBER, PIE } from 'shared/constants/stats-type';
import { YELLOW, BLUE } from 'shared/constants/color';

export default (state) => {
  const products = flow(
    getEntityArray('product'),
    reject(propEq('status', DELETED)),
    map(product => ({
      ...product,
      category: getEntity(
        `productCategory.${prop('productCategory.id', product)}.name`,
      )(state),
    })),
  )(state);

  return {
    products,
    statsItems: [{
      key: 'total',
      title: 'Total',
      type: NUMBER,
      data: size(products),
    }, {
      key: 'status',
      title: 'Status',
      type: PIE,
      data: [{
        name: getProductStatusText(PUBLISHED),
        value: flow(filter(propEq('status', PUBLISHED)), size)(products),
        fill: BLUE,
      }, {
        name: getProductStatusText(DRAFT),
        value: flow(filter(propEq('status', DRAFT)), size)(products),
        fill: YELLOW,
      }],
    }],
  };
};
