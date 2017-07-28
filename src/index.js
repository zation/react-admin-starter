import { polyfill } from 'es6-promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createBrowserHistory from 'history/createBrowserHistory';
import qs from 'qs';

import router from './router';
import createStore from './create-store';
import Root from './root';

polyfill();

const history = createBrowserHistory();
const store = createStore({ history });
let currentLocation = history.location;

const render = async (location) => {
  currentLocation = location;

  const component = await router.resolve({
    store,
    path: location.pathname,
    query: qs.parse(location.search),
  });

  // Prevent multiple page renders during the routing process
  if (currentLocation.key !== location.key) {
    return;
  }

  ReactDOM.render(
    <AppContainer>
      <Root store={store}>
        {component}
      </Root>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(currentLocation);
history.listen(render);

// eslint-disable-next-line no-undef
if (DEBUG && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    store.replaceReducer(require('./reducers').default);
  });
  module.hot.accept('./router', () => render(currentLocation));
}
