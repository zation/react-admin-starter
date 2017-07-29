import { createStore, applyMiddleware, compose } from 'redux';

import fetch from 'shared/middlewares/fetch';
import handleServerError from 'shared/middlewares/handle-server-error';
import handleHistory from 'shared/middlewares/handle-history';
import handleAuthorization from 'shared/middlewares/handle-authorization';
import reducers from './reducers';

const { __REDUX_DEVTOOLS_EXTENSION__ } = global;

export default ({ history }) => {
  const middlewares = [
    handleHistory(history),
    fetch,
    handleServerError,
    handleAuthorization,
  ];

  // eslint-disable-next-line no-undef
  if (DEBUG) {
    // eslint-disable-next-line global-require
    const { createLogger } = require('redux-logger');

    middlewares.push(createLogger({
      collapsed: true,
    }));
  }

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(
    reducers,
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__(),
  );
};
