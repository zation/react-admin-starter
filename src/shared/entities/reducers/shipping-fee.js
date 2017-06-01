import replace from '../replace';
import { handleActions } from '../../utils/redux-actions';
import {
  UPDATE,
  READ_ONE,
} from '../actions/shipping-fee';

export default handleActions({
  [UPDATE]: (shippingFee, { payload }) => ({
    ...shippingFee,
    shippingFee: payload.shippingFee,
    noShippingFeePrice: payload.noShippingFeePrice,
  }),

  [READ_ONE]: (shippingFee, { payload }) => ({
    ...shippingFee,
    shippingFee: payload.shippingFee,
    noShippingFeePrice: payload.noShippingFeePrice,
  }),
}, {});
