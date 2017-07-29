import { ACTIVE } from '../../constants/user-status';
import { handleActions, combineActions } from '../../utils/redux-actions';
import { REGISTER, READ_MINE } from '../actions/user';
import { LOGIN, LOGOUT, INIT } from '../actions/auth';

export default {
  auth: handleActions({
    [INIT]: (auth, { payload }) => ({
      authorization: payload,
    }),

    [combineActions(REGISTER, LOGIN)]: (auth, {
      payload: { user: { id, status }, authorization },
    }) => {
      if (status === ACTIVE) {
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

    [READ_MINE]: (auth, { payload: { id, status } }) => {
      if (status === ACTIVE) {
        return {
          ...auth,
          isLogin: true,
          currentUserId: id,
        };
      }
      return auth;
    },

  }, {
    authorization: null,
    isLogin: false,
    currentUserId: null,
  }),
};
