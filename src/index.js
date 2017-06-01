import { polyfill } from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import createStore from './create-store';
import Root from './root';

polyfill();

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

// eslint-disable-next-line no-undef
if (DEBUG && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    store.replaceReducer(require('./reducers').default);
  });
  module.hot.accept('./root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./root').default;

    ReactDOM.render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);
