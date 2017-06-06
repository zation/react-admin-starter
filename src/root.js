import PropTypes from 'prop-types';
import React from 'react';
import { setPropTypes, compose, setDisplayName } from 'recompose';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import './antd_.less';
import './index_.less';

import createRoutes from './create-routes';

export default compose(
  setPropTypes({
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }),
  setDisplayName(__filename),
)(({ store, history }) => (
  <Provider store={store}>
    <Router history={history} routes={createRoutes(store)} />
  </Provider>
));
