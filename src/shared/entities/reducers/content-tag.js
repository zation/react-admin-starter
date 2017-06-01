import { flow, flatMap, prop, concat, uniq, isArray } from 'lodash/fp';

import { handleActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  READ_ONE,
  CREATE,
  UPDATE,
} from '../actions/content';

const merge = (contentTags, { payload }) => flow(
  isArray(payload) ? flatMap(prop('tags')) : prop('tags'),
  concat(contentTags),
  uniq,
)(payload);

export default handleActions({
  [READ_ALL]: merge,

  [READ_ONE]: merge,

  [CREATE]: merge,

  [UPDATE]: merge,

}, []);
