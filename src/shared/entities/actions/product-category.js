import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { read, put, post, del } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const CREATE = actionType('CREATE');
export const UPDATE = actionType('UPDATE');
export const REMOVE = actionType('REMOVE');

export const readAll = createAction(
  READ_ALL,
  () => read('/product-category/all'),
);

export const create = createAction(
  CREATE,
  ({ name }) => post('/product-category', { name }),
);

export const update = createAction(
  UPDATE, ({ id, name }) => put(`/product-category/${id}`, {
    id,
    name,
  }),
);

export const remove = createAction(
  REMOVE,
  ({ id }) => del(`/product-category/${id}`),
);
