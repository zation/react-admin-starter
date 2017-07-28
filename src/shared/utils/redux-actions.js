import {
  createAction as originalCreateAction,
} from 'redux-actions';

export const actionTypeCreator = filename => actionName => `~${filename}#${actionName}`;

export const createAction = (type, payloadCreator, metaCreator) =>
  originalCreateAction(type, payloadCreator, metaCreator || (data => data));

export { handleActions, combineActions } from 'redux-actions';
