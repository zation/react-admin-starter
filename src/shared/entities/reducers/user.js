import { prop } from 'lodash/fp';

import merge from '../merge';
import remove from '../remove';
import { user } from '../schema';
import { handleActions, combineActions } from '../../utils/redux-actions';
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

export default {
  user: handleActions({
    [combineActions(REGISTER, READ_MINE, READ_ONE, READ_ALL, UPDATE, CREATE)]: merge(user),

    [LOGIN]: (originalData, { payload }) =>
      merge(user)(originalData, { payload: prop('user')(payload) }),

    [REMOVE]: remove(user),

  }, {}),
};
