import merge from '../merge';
import remove from '../remove';
import { productCategory } from '../schema';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  UPDATE,
  CREATE,
  REMOVE,
} from '../actions/product-category';

export default {
  productCategory: handleActions({
    [combineActions(READ_ALL, UPDATE, CREATE)]: merge(productCategory),

    [REMOVE]: remove(productCategory),

  }, {}),
};
