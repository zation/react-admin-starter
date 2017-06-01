import { prop } from 'lodash/fp';

import merge from '../merge';
import remove from '../remove';
import { user } from '../schema';
import { handleActions } from '../../utils/redux-actions';
import { LOGIN } from '../actions/auth';
import {
  REGISTER,
  READ_MINE,
  UPDATE,
  READ_ALL,
  READ_ONE,
  CREATE,
  REMOVE,
} from '../actions/user';

export default handleActions({
  [REGISTER]: merge(user),

  [LOGIN]: (originalData, { payload }) =>
    merge(user)(originalData, { payload: prop('user')(payload) }),

  [READ_MINE]: merge(user),

  [READ_ONE]: merge(user),

  [READ_ALL]: merge(user),

  [UPDATE]: merge(user),

  [CREATE]: merge(user),

  [REMOVE]: remove(user),

}, {});
