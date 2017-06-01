import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { post, read, put, del } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_MINE = actionType('READ_MINE');
export const READ_ONE = actionType('READ_ONE');
export const READ_ALL = actionType('READ_ALL');
export const REGISTER = actionType('REGISTER');
export const RESET_PASSWORD = actionType('RESET_PASSWORD');
export const UPDATE = actionType('UPDATE');
export const CREATE = actionType('CREATE');
export const REMOVE = actionType('REMOVE');

export const register = createAction(
  REGISTER,
  ({ username, password }) =>
    post('/user', { username, password }, { withoutAuth: true }),
);

export const readMine = createAction(
  READ_MINE,
  () => read('/user/mine'),
);

export const readOne = createAction(
  READ_ONE,
  ({ id }) => read(`/user/${id}`),
);

export const readAll = createAction(
  READ_ALL,
  () => read('/user/all'),
);

export const create = createAction(
  CREATE, ({
    username,
    nickname,
    birthDate,
    gender,
    email,
    password,
    roleKey,
    status,
  }) => post('/user', {
    username,
    nickname,
    birthDate,
    gender,
    email,
    password,
    role: {
      key: roleKey,
    },
    status,
  }),
);

export const update = createAction(
  UPDATE, ({
    id,
    username,
    nickname,
    birthDate,
    gender,
    email,
    password,
    roleKey,
    status,
  }) => put(`/user/${id}`, {
    id,
    username,
    nickname,
    birthDate,
    gender,
    email,
    password,
    role: roleKey ? {
      key: roleKey,
    } : undefined,
    status,
  }),
);

export const remove = createAction(REMOVE, ({ id }) => del(`/user/${id}`));

export const resetPassword = createAction(
  RESET_PASSWORD,
  ({ userId, oldPassword, newPassword }) =>
    post(`/user/${userId}/action/reset-password`, { oldPassword, newPassword }),
);
