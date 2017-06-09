import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';

import Detail from '../../components/order-detail';
import selector from './order-detail-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector),
)(({ order, location: { query: { backUrl } } }) => (
  <Detail order={order} backUrl={backUrl} />
));
