import merge from '../merge';
import remove from '../remove';
import { product } from '../schema';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  UPDATE,
  CREATE,
  REMOVE,
} from '../actions/product';

export default {
  product: handleActions({
    [combineActions(READ_ALL, UPDATE, CREATE)]: merge(product),

    [REMOVE]: remove(product),

  }, {}),
};
