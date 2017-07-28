import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux';
import Layout from 'shared/containers/layout';

import Detail from '../components/customer-detail';
import selector from './customer-detail-selector';

export default compose(
  setDisplayName(__filename),
  connect(selector),
)(({ user, coupons, orders }) => (
  <Layout>
    <Detail user={user} coupons={coupons} orders={orders} />
  </Layout>
));
