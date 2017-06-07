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

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component history={history} store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

// eslint-disable-next-line no-undef
if (DEBUG && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    store.replaceReducer(require('./reducers').default);
  });
  module.hot.accept('./root', () => render(Root));
}
