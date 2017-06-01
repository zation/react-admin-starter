import merge from '../merge';
import remove from '../remove';
import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  REMOVE,
  CREATE,
  UPDATE,
} from '../actions/role';
import { role } from '../schema';

export default handleActions({
  [READ_ALL]: merge(role),

  [CREATE]: merge(role),

  [UPDATE]: merge(role),

  [REMOVE]: remove(role),

}, {});
