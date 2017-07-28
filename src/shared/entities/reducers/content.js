import merge from '../merge';
import remove from '../remove';
import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  READ_ONE,
  REMOVE,
  CREATE,
  UPDATE,
} from '../actions/content';
import { content } from '../schema';

export default {
  content: handleActions({
    [combineActions(READ_ALL, READ_ONE, CREATE, UPDATE)]: merge(content),

    [REMOVE]: remove(content),

  }, {}),
};
