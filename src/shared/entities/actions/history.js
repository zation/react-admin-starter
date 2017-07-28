import { createAction, actionTypeCreator } from '../../utils/redux-actions';

const actionType = actionTypeCreator(__filename);

export const INIT = actionType('INIT');
export const PUSH = actionType('PUSH');
export const REPLACE = actionType('REPLACE');
export const GO = actionType('GO');
export const GO_BACK = actionType('GO_BACK');
export const GO_FORWARD = actionType('GO_FORWARD');

export const init = createAction(INIT);
export const push = createAction(PUSH);
export const replace = createAction(REPLACE);
export const go = createAction(GO);
export const goBack = createAction(GO_BACK);
export const goForward = createAction(GO_FORWARD);
