import PropTypes from 'prop-types';
import React from 'react';
import { setPropTypes, compose, setDisplayName } from 'recompose';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import './antd_.less';
import './index_.less';

export default compose(
  setPropTypes({
    store: PropTypes.object.isRequired,
  }),
  setDisplayName(__filename),
)(({ store, children }) => (
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      {children}
    </Provider>
  </LocaleProvider>
));
