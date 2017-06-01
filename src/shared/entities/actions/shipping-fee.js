import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { read, put } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ONE = actionType('READ_ONE');
export const UPDATE = actionType('UPDATE');

export const readOne = createAction(
  READ_ONE,
  () => read('/shop/shipping-fee'),
);

export const update = createAction(
  UPDATE,
  (shippingFee) => put('/shop/shipping-fee', shippingFee),
);
