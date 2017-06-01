import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { read, put, post, del } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const CREATE = actionType('CREATE');
export const UPDATE = actionType('UPDATE');
export const REMOVE = actionType('REMOVE');

export const readAll = createAction(
  READ_ALL,
  () => read('/product/all'),
);

export const create = createAction(
  CREATE, ({
    id,
    name,
    cover,
    images,
    detail,
    price,
    originalPrice,
    inventory,
    capacity,
    productCategory,
    status,
    isRecommended,
  }) =>
    post('/product', {
      id,
      name,
      cover,
      images,
      detail,
      price,
      originalPrice,
      inventory,
      capacity,
      productCategory,
      status,
      isRecommended,
    }),
);

export const update = createAction(
  UPDATE, ({
    id,
    name,
    cover,
    images,
    detail,
    price,
    originalPrice,
    inventory,
    capacity,
    productCategory,
    status,
    isRecommended,
  }) =>
    put(`/product/${id}`, {
      id,
      name,
      cover,
      images,
      detail,
      price,
      originalPrice,
      inventory,
      capacity,
      productCategory,
      status,
      isRecommended,
    }),
);

export const remove = createAction(
  REMOVE, ({ id }) => del(`/product/${id}`),
);
