import cookie from 'js-cookie';

import authorizationCookieName from '../../constants/authorization-cookie-name';
import { ACTIVE } from '../../constants/user-status';
import { handleActions } from '../../utils/redux-actions';
import { REGISTER, READ_MINE } from '../actions/user';
import { LOGIN, LOGOUT } from '../actions/auth';

export default handleActions({
  [REGISTER]: (auth, { payload }) => {
    cookie.set(authorizationCookieName, payload.authorization);
    return {
      isLogin: true,
      authorization: payload.authorization,
      currentUserId: payload.id,
    };
  },

  [LOGIN]: (auth, { payload: { user: { id, status }, authorization } }) => {
    if (status === ACTIVE) {
      cookie.set(authorizationCookieName, authorization);
      return {
        isLogin: true,
        authorization,
        currentUserId: id,
      };
    }
    return auth;
  },

  [LOGOUT]: () => ({
    isLogin: false,
    authorization: null,
    currentUserId: null,
  }),

  [READ_MINE]: (auth, { payload }) => ({
    ...auth,
    isLogin: true,
    currentUserId: payload.id,
  }),

}, {
  authorization: global.document ? cookie.get(authorizationCookieName) || '' : '',
  isLogin: false,
  currentUserId: null,
});
