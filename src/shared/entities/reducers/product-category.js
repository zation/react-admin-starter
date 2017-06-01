import merge from '../merge';
import remove from '../remove';
import { productCategory } from '../schema';
import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  UPDATE,
  CREATE,
  REMOVE,
} from '../actions/product-category';

export default handleActions({
  [READ_ALL]: merge(productCategory),
  [UPDATE]: merge(productCategory),
  [CREATE]: merge(productCategory),
  [REMOVE]: remove(productCategory),

}, {});
