import replace from '../replace';
import { shopBanner } from '../schema';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  UPDATE_ALL,
  READ_ALL,
} from '../actions/shop-banner';

export default {
  shopBanner: handleActions({
    [combineActions(UPDATE_ALL, READ_ALL)]: replace(shopBanner),

  }, {}),
};
