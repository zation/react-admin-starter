import NProgress from 'nprogress';

import isPromise from './is-promise';

export default promiseFunction => (nextState, replace, callback) => {
  const result = promiseFunction(nextState, replace);
  if (isPromise(result)) {
    NProgress.start();
    result.then(() => {
      NProgress.done();
      callback();
    }, () => {
      NProgress.done();
      callback();
    });
  } else {
    callback();
  }
};
