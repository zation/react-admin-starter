import replace from '../replace';
import { shopBanner } from '../schema';
import { handleActions } from '../../utils/redux-actions';
import {
  UPDATE_ALL,
  READ_ALL,
} from '../actions/shop-banner';

export default handleActions({
  [UPDATE_ALL]: replace(shopBanner),

  [READ_ALL]: replace(shopBanner),
}, {});
