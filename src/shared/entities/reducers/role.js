import merge from '../merge';
import remove from '../remove';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  REMOVE,
  CREATE,
  UPDATE,
} from '../actions/role';
import { role } from '../schema';

export default {
  role: handleActions({
    [combineActions(READ_ALL, CREATE, UPDATE)]: merge(role),

    [REMOVE]: remove(role),

  }, {}),
};
