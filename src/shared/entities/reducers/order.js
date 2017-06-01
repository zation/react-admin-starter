import merge from '../merge';
import { order } from '../schema';
import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  UPDATE,
  CLOSE,
  COMPLETE,
} from '../actions/order';

export default handleActions({
  [READ_ALL]: merge(order),
  [UPDATE]: merge(order),
  [CLOSE]: merge(order),
  [COMPLETE]: merge(order),

}, {});
