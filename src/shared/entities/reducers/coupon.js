import merge from '../merge';
import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  CREATE,
  UPDATE,
  ACTIVATE,
  DEACTIVATE,
  READ_USER_HISTORY,
} from '../actions/coupon';
import { coupon } from '../schema';

export default handleActions({
  [READ_ALL]: merge(coupon),

  [CREATE]: merge(coupon),

  [UPDATE]: merge(coupon),

  [ACTIVATE]: merge(coupon),

  [DEACTIVATE]: merge(coupon),

  [READ_USER_HISTORY]: (originalCoupon, { payload, meta: { id } }) => ({
    ...originalCoupon,
    [id]: {
      ...originalCoupon[id],
      history: payload,
    },
  }),

}, {});
