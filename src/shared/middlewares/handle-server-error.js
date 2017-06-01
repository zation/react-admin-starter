import { push } from 'react-router-redux';
import { Message } from 'antd';
import { map, prop } from 'lodash/fp';

import { THROW_SERVER_ERROR } from '../entities/actions/server-error';

export default ({ dispatch }) => next => action => {
  if (action.type === THROW_SERVER_ERROR) {
    const {
      meta: { status, ignoreGlobalWarning, ignoreAuthRedirection },
      payload: { errors },
    } = action;
    if (!ignoreGlobalWarning) {
      Message.error(map(prop('message'))(errors), 5);
    }
    if (status === 401 && !ignoreAuthRedirection) {
      dispatch(push('/auth/login'));
    }
  }
  return next(action);
};
