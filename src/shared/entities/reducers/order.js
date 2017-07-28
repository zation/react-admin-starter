import merge from '../merge';
import { order } from '../schema';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  UPDATE,
  CLOSE,
  COMPLETE,
} from '../actions/order';

export default {
  order: handleActions({
    [combineActions(READ_ALL, UPDATE, CLOSE, COMPLETE)]: merge(order),

  }, {}),
};
