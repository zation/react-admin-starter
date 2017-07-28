import merge from '../merge';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  CREATE,
  UPDATE,
  ACTIVATE,
  DEACTIVATE,
  READ_USER_HISTORY,
} from '../actions/coupon';
import { coupon } from '../schema';

export default {
  coupon: handleActions({
    [combineActions(READ_ALL, CREATE, UPDATE, ACTIVATE, DEACTIVATE)]: merge(coupon),

    [READ_USER_HISTORY]: (originalCoupon, { payload, meta: { id } }) => ({
      ...originalCoupon,
      [id]: {
        ...originalCoupon[id],
        history: payload,
      },
    }),
  }, {}),
};
