import { PUSH, REPLACE, GO, GO_FORWARD, GO_BACK } from '../history';

export default (history) => () => next => (action) => {
  const { payload, type } = action;
  if (type === PUSH) {
    history.push(payload);
  }
  if (type === REPLACE) {
    history.replace(payload);
  }
  if (type === GO) {
    history.go(payload);
  }
  if (type === GO_FORWARD) {
    history.goForward();
  }
  if (type === GO_BACK) {
    history.goBack();
  }
  return next(action);
};
