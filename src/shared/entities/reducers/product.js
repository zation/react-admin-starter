import merge from '../merge';
import remove from '../remove';
import { product } from '../schema';
import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  UPDATE,
  CREATE,
  REMOVE,
} from '../actions/product';

export default handleActions({
  [READ_ALL]: merge(product),
  [UPDATE]: merge(product),
  [CREATE]: merge(product),
  [REMOVE]: remove(product),

}, {});
