import { createAction, actionTypeCreator } from '../../utils/redux-actions';

import { ADMIN } from '../../constants/user-role';
import { post } from '../request';

const actionType = actionTypeCreator(__filename);
export const LOGIN = actionType('LOGIN');
export const LOGOUT = actionType('LOGOUT');

export const login = createAction(
  LOGIN,
  ({ username, password }) => post(
    `/auth/local?type=${ADMIN}`, {
      username,
      password,
    }, {
      withoutAuth: true,
      headers: { 'x-auth-username': username, 'x-auth-password': password },
    },
  ),
);

export const logout = createAction(LOGOUT);
