import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Switch } from 'antd';
import Link from 'shared/components/link';

import Search, { searchComposer, searchDataSource } from 'shared/components/search';
import { getCouponTypeText } from 'shared/constants/coupon-type';
import { getCouponStatusText, ACTIVE } from 'shared/constants/coupon-status';
import { date } from 'shared/utils/formatter';
import Modal from './coupon-history-model';

export default compose(
  setDisplayName(__filename),
  searchComposer,
  setPropTypes({
    coupons: PropTypes.array.isRequired,
    activateCoupon: PropTypes.func.isRequired,
    deactivateCoupon: PropTypes.func.isRequired,
    readUserHistory: PropTypes.func.isRequired,
  }),
  withProps(({ activateCoupon, deactivateCoupon, readUserHistory }) => ({
    columns: [{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    }, {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      render: getCouponTypeText,
    }, {
      title: 'Code',
      key: 'code',
      dataIndex: 'code',
    }, {
      title: 'Inventory',
      key: 'inventory',
      dataIndex: 'inventory',
    }, {
      title: 'Capacity',
      key: 'capacity',
      dataIndex: 'capacity',
    }, {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: getCouponStatusText,
    }, {
      title: 'Expire Time',
      key: 'expiredAt',
      dataIndex: 'expiredAt',
      render: date(),
    }, {
      title: 'Activation',
      key: 'activation',
      render: ({ id, status }) => (
        <div>
          {
            status === ACTIVE
              ? <Switch checked onChange={deactivateCoupon({ id })} />
              : <Switch checked={false} onChange={activateCoupon({ id })} />
          }
        </div>
      ),
    }, {
      title: 'Operation',
      key: 'operators',
      render: ({ id, name, history }) => (
        <div>
          <Modal readUserHistory={readUserHistory} id={id} name={name} history={history} />
          &nbsp;&nbsp;
          <Link to={`/shop/coupon/edit/${id}`}>Edit</Link>
        </div>
      ),
    }],
  })),
)(({ coupons, columns, search, query }) => (
  <div>
    <Search
      placeholder="Please search by name, code"
      search={search}
    />

    <Table
      dataSource={
        searchDataSource(['name', 'code'], query)(coupons)
      }
      columns={columns}
      rowKey="id"
    />
  </div>
));
