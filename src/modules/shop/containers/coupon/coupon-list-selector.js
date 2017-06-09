import getEntity, { getEntityArray } from 'shared/entities/get-entity';
import { flow, map, size, filter, propEq } from 'lodash/fp';
import moment from 'moment';

import { NUMBER, PIE } from 'shared/constants/stats-type';
import { PERCENTAGE, FIXED, getCouponTypeText } from 'shared/constants/coupon-type';
import { ACTIVE, INACTIVE, getCouponStatusText } from 'shared/constants/coupon-status';
import { YELLOW, BLUE, GREEN, RED } from 'shared/constants/color';

export default (state) => {
  const coupons = flow(
    getEntityArray('coupon'),
    map((coupon) => ({
      ...coupon,
      history: map((item) => ({
        ...item,
        user: getEntity(`user.${item.userId}`)(state),
      }))(coupon.history),
    })),
  )(state);


  return {
    coupons,
    statsItems: [{
      key: 'total',
      title: '总数',
      type: NUMBER,
      data: size(coupons),
    }, {
      key: 'type',
      title: '类型',
      type: PIE,
      data: [{
        name: getCouponTypeText(PERCENTAGE),
        value: flow(filter(propEq('type', PERCENTAGE)), size)(coupons),
        fill: BLUE,
      }, {
        name: getCouponTypeText(FIXED),
        value: flow(filter(propEq('type', FIXED)), size)(coupons),
        fill: YELLOW,
      }],
    }, {
      key: 'status',
      title: '状态',
      type: PIE,
      data: [{
        name: getCouponStatusText(ACTIVE),
        value: flow(filter(propEq('status', ACTIVE)), size)(coupons),
        fill: GREEN,
      }, {
        name: getCouponStatusText(INACTIVE),
        value: flow(filter(propEq('status', INACTIVE)), size)(coupons),
        fill: RED,
      }],
    }, {
      key: 'expiration',
      title: '过期',
      type: PIE,
      data: [{
        name: '未过期',
        value: flow(filter(({ expiredAt }) => moment().isBefore(expiredAt)), size)(coupons),
        fill: GREEN,
      }, {
        name: '已过期',
        value: flow(filter(({ expiredAt }) => moment().isAfter(expiredAt)), size)(coupons),
        fill: RED,
      }],
    }],
  };
};
