import React from 'react';
import { compose, setDisplayName, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { Button, Message } from 'antd';
import { Link } from 'react-router';

import { FIXED, PERCENTAGE } from 'shared/constants/coupon-type';
import {
  activate as activateCouponAction,
  deactivate as deactivateCouponAction,
  readUserHistory as readUserHistoryAction,
} from 'shared/entities/actions/coupon';
import Stats from 'shared/components/stats';
import selector from './coupon-list-selector';
import List from '../../components/coupon-list';

export default compose(
  setDisplayName(__filename),
  connect(selector, {
    activateCoupon: activateCouponAction,
    deactivateCoupon: deactivateCouponAction,
    readUserHistory: readUserHistoryAction,
  }),
  withHandlers({
    activateCoupon: ({ activateCoupon }) => ({ id }) => () =>
      activateCoupon({ id }).then(() => {
        Message.success('Activated');
      }),
    deactivateCoupon: ({ deactivateCoupon }) => ({ id }) => () =>
      deactivateCoupon({ id }).then(() => {
        Message.success('Inactivated');
      }),
    readUserHistory: ({ readUserHistory }) => ({ id }) =>
      readUserHistory({ id }),
  }),
)(({ coupons, activateCoupon, deactivateCoupon, readUserHistory, statsItems }) => (
  <div>
    <Stats items={statsItems} />
    <div style={{ marginBottom: -30 }}>
      <Button type="primary" size="large">
        <Link to={`/shop/coupon/create/${FIXED}`}>Create fixed coupon</Link>
      </Button>&nbsp;&nbsp;
      <Button type="primary" size="large">
        <Link to={`/shop/coupon/create/${PERCENTAGE}`}>Create percentage coupon</Link>
      </Button>
    </div>
    <List
      coupons={coupons}
      activateCoupon={activateCoupon}
      deactivateCoupon={deactivateCoupon}
      readUserHistory={readUserHistory}
    />
  </div>
));
