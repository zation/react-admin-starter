import { createAction, actionTypeCreator } from '../../utils/redux-actions';

import { read, put, del, post } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const UPDATE = actionType('UPDATE');
export const REMOVE = actionType('REMOVE');
export const CREATE = actionType('CREATE');

export const readAll = createAction(
  READ_ALL,
  () => read('/role/all'),
);

export const update = createAction(
  UPDATE,
  ({ id, name, operations }) => put(`/role/${id}`, {
    name,
    key: name,
    operations,
  }),
);

export const remove = createAction(
  REMOVE,
  ({ id }) => del(`/role/${id}`),
);

export const create = createAction(
  CREATE,
  ({ name, operations }) => post('/role', {
    name,
    key: name,
    operations,
  }),
);
