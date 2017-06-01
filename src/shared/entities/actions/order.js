import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { read, put, post } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const UPDATE = actionType('UPDATE');
export const CLOSE = actionType('CLOSE');
export const COMPLETE = actionType('COMPLETE');
export const UPDATE_SHIPPING = actionType('UPDATE_SHIPPING');

export const readAll = createAction(
  READ_ALL,
  () => read('/order/all'),
);

export const update = createAction(
  UPDATE, ({ id, shippingCompany, shippingNumber }) => put(`/order/${id}`, {
    id,
    shippingCompany,
    shippingNumber,
  }),
);

export const close = createAction(
  CLOSE,
  ({ id }) => post(`/order/${id}/action/close`),
);

export const complete = createAction(
  COMPLETE,
  ({ id }) => post(`/order/${id}/action/complete`),
);

export const updateShipping = createAction(
  UPDATE_SHIPPING, ({
    id,
    shippingCompany,
    shippingNumber,
  }) => put(`/order/${id}/shipping`, {
    shippingCompany,
    shippingNumber,
  }),
);
