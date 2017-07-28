import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes } from 'recompose';
import classNames from 'classnames';

import style from './footer.less';

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    className: PropTypes.string,
  }),
)(({ className }) => (
  <div className={classNames(style.Root, className)}>
    React Admin Starter
  </div>
));
