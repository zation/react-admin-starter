import getEntity from 'shared/entities/get-entity';
import { merge, prop } from 'lodash/fp';

export default (state, { params: { orderId } }) => {
  const order = getEntity(`order.${orderId}`)(state);

  return {
    order: merge({
      user: getEntity(`user.${prop('user.id')(order)}`)(state),
      coupon: getEntity(`coupon.${prop('coupon.id')(order)}`)(state),
    })(order),
  };
};
