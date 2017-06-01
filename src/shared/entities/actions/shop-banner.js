import { createAction, actionTypeCreator } from '../../utils/redux-actions';
import { read, put } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const UPDATE_ALL = actionType('UPDATE_ALL');

export const readAll = createAction(
  READ_ALL,
  () => read('/shop/banner/all'),
);

export const updateAll = createAction(
  UPDATE_ALL,
  (banners) => put('/shop/banner', banners),
);
