import replace from '../replace';
import { banner } from '../schema';
import { handleActions } from '../../utils/redux-actions';
import {
  UPDATE_ALL,
  READ_ALL,
} from '../actions/banner';

export default handleActions({
  [UPDATE_ALL]: replace(banner),

  [READ_ALL]: replace(banner),

}, {});
