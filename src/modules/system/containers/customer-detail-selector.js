import { map, flow, prop, filter, propEq } from 'lodash/fp';

import getEntity, { getEntityArray } from 'shared/entities/get-entity';

export default (state, { params: { customerId } }) => {
  const user = getEntity(`user.${customerId}`)(state);

  return {
    user,
    coupons: flow(
      prop('coupons'),
      map(({ coupon, ...others }) => ({
        coupon: getEntity(`coupon.${coupon.id}`)(state),
        ...others,
      })),
    )(user),
    orders: flow(
      getEntityArray('order'),
      filter(propEq('user.id', user.id)),
    )(state),
  };
};
