import { flow, flatMap, prop, concat, uniq, isArray } from 'lodash/fp';

import { handleActions, combineActions } from '../../utils/redux-actions';
import {
  READ_ALL,
  READ_ONE,
  CREATE,
  UPDATE,
} from '../actions/content';

export default {
  contentTag: handleActions({
    [combineActions(READ_ALL, READ_ONE, CREATE, UPDATE)]: (contentTags, { payload }) => flow(
      isArray(payload) ? flatMap(prop('tags')) : prop('tags'),
      concat(contentTags),
      uniq,
    )(payload),

  }, []),
};
