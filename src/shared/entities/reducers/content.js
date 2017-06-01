import merge from '../merge';
import remove from '../remove';
import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  READ_ONE,
  REMOVE,
  CREATE,
  UPDATE,
} from '../actions/content';
import { content } from '../schema';

export default handleActions({
  [READ_ALL]: merge(content),

  [READ_ONE]: merge(content),

  [CREATE]: merge(content),

  [UPDATE]: merge(content),

  [REMOVE]: remove(content),

}, {});
