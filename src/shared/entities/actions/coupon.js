import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { read, put, post } from '../request';
import { ACTIVE } from '../../constants/coupon-status';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const READ_USER_HISTORY = actionType('READ_USER_HISTORY');
export const CREATE = actionType('CREATE');
export const UPDATE = actionType('UPDATE');
export const ACTIVATE = actionType('ACTIVATE');
export const DEACTIVATE = actionType('DEACTIVATE');

export const readAll = createAction(
  READ_ALL,
  () => read('/coupon/all'),
);

export const create = createAction(
  CREATE, ({
      name,
      type,
      discount,
      condition,
      inventory,
      capacity,
      expiredAt,
    }) =>
    post('/coupon', {
      name,
      type,
      discount,
      condition,
      inventory,
      capacity,
      expiredAt,
      status: ACTIVE,
    }),
);

export const update = createAction(
  UPDATE, ({
      id,
      capacity,
      expiredAt,
    }) =>
    put(`/coupon/${id}`, {
      id,
      capacity,
      expiredAt,
    }),
);

export const activate = createAction(
  ACTIVATE,
  ({ id }) => post(`/coupon/${id}/action/activate`),
);

export const deactivate = createAction(
  DEACTIVATE,
  ({ id }) => post(`/coupon/${id}/action/deactivate`),
);

export const readUserHistory = createAction(
  READ_USER_HISTORY,
  ({ id }) => read(`/coupon/${id}/user-coupon/all`),
);
