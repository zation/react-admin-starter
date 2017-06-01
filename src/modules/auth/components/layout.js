import React from 'react';
import { compose, setDisplayName } from 'recompose';

import Footer from '../../layout/components/footer';

import style from './layout.less';

export default compose(
  setDisplayName(__filename),
)(({ children }) => (
  <div className={style.Root}>
    <div className={style.Header}>
      <span className={style.Title}>React Admin Starter</span>
    </div>
    {children}
    <Footer className={style.Footer} />
  </div>
));
