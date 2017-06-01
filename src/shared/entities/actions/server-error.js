import { actionTypeCreator } from '../../utils/redux-actions';

const actionType = actionTypeCreator(__filename);
export const THROW_SERVER_ERROR = actionType('THROW_SERVER_ERROR');

export const throwServerError = (payload, meta) => ({
  type: THROW_SERVER_ERROR,
  payload,
  meta,
  error: true,
});
