import PropTypes from 'prop-types';
import React from 'react';
import { setPropTypes, compose, setDisplayName } from 'recompose';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import createRoutes from './create-routes';

import './antd_.less';
import './index_.less';

export default compose(
  setPropTypes({
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }),
  setDisplayName(__filename),
)(({ store, history }) => (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Router history={history} routes={createRoutes(store)} />
    </Provider>
  </LocaleProvider>
));
