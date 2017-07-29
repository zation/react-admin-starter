import cookie from 'js-cookie';

import authorizationCookieName from '../constants/authorization-cookie-name';
import { ACTIVE } from '../constants/user-status';
import { REGISTER } from '../entities/actions/user';
import { LOGIN, LOGOUT } from '../entities/actions/auth';

export default () => next => (action) => {
  const { payload, type } = action;
  if (type === REGISTER || type === LOGIN) {
    const { user: { status }, authorization } = payload;
    if (status === ACTIVE) {
      cookie.set(authorizationCookieName, authorization);
    }
  }
  if (type === LOGOUT) {
    cookie.remove(authorizationCookieName);
  }
  return next(action);
};
