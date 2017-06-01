import { pick } from 'lodash/fp';

import getEntity from 'shared/entities/get-entity';

export default (state, { params: { couponId } }) => {
  const coupon = getEntity(`coupon.${couponId}`)(state);
  return {
    initialValues: pick([
      'inventory',
      'capacity',
      'expiredAt',
    ])(coupon),
    ...pick(['name', 'type', 'code'])(coupon),
    couponId: Number(couponId),
  };
};
