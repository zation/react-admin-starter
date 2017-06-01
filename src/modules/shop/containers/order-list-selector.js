import getEntity, { getEntityArray } from 'shared/entities/get-entity';
import { flow, map, size, filter, propEq, sumBy, prop, reject } from 'lodash/fp';

import { NUMBER, PIE } from 'shared/constants/stats-type';
import { FINISHED } from 'shared/constants/payment-status';
import {
  FINISHED as ORDER_FINISHED,
  SHIPPING,
  PENDING,
  CLOSED,
  getOrderStatusText,
} from 'shared/constants/order-status';
import { YELLOW, BLUE, GREEN, RED } from 'shared/constants/color';
import { price } from 'shared/utils/formatter';

export default (state) => {
  const orders = flow(
    getEntityArray('order'),
    map(order => ({
      ...order,
      user: getEntity(`user.${order.user.id}`)(state),
    })),
  )(state);

  return {
    orders,
    statsItems: [{
      key: 'total',
      title: '订单总数',
      data: size(orders),
      type: NUMBER,
    }, {
      key: 'grandTotal',
      title: '应付款（元）',
      data: flow(
        reject(propEq('status', CLOSED)),
        sumBy(prop('grandTotal')),
      )(orders),
      type: NUMBER,
      formatter: price({ currency: '' }),
    }, {
      key: 'payedGrandTotal',
      title: '已付款（元）',
      data: sumBy(
        ({ grandTotal, payment: { status } }) => (status === FINISHED ? grandTotal : 0),
      )(orders),
      type: NUMBER,
      formatter: price({ currency: '' }),
    }, {
      key: 'status',
      title: '状态',
      type: PIE,
      data: [{
        name: getOrderStatusText(PENDING),
        value: flow(filter(propEq('status', PENDING)), size)(orders),
        fill: YELLOW,
      }, {
        name: getOrderStatusText(SHIPPING),
        value: flow(filter(propEq('status', SHIPPING)), size)(orders),
        fill: BLUE,
      }, {
        name: getOrderStatusText(ORDER_FINISHED),
        value: flow(filter(propEq('status', ORDER_FINISHED)), size)(orders),
        fill: GREEN,
      }, {
        name: getOrderStatusText(CLOSED),
        value: flow(filter(propEq('status', CLOSED)), size)(orders),
        fill: RED,
      }],
    }],
  };
};
