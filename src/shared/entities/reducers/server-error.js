import { prop } from 'lodash/fp';

import { handleActions } from '../../utils/redux-actions';
import { THROW_SERVER_ERROR } from '../actions/server-error';

export default handleActions({
  [THROW_SERVER_ERROR]: (serverError, { payload, meta }) => {
    const errorMessage = prop(payload, 'errors.default');
    if (errorMessage) {
      return { message: errorMessage, ...meta };
    }
    return serverError;
  },

}, {});
