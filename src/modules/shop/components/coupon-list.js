import PropTypes from 'prop-types';
import React from 'react';
import { compose, setDisplayName, setPropTypes, withProps } from 'recompose';
import { Table, Switch } from 'antd';
import { Link } from 'react-router';

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
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    }, {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      render: getCouponTypeText,
    }, {
      title: '兑换码',
      key: 'code',
      dataIndex: 'code',
    }, {
      title: '库存',
      key: 'inventory',
      dataIndex: 'inventory',
    }, {
      title: '总量',
      key: 'capacity',
      dataIndex: 'capacity',
    }, {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: getCouponStatusText,
    }, {
      title: '过期时间',
      key: 'expiredAt',
      dataIndex: 'expiredAt',
      render: date(),
    }, {
      title: '领取开关',
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
      title: '操作',
      key: 'operators',
      render: ({ id, name, history }) => (
        <div>
          <Modal readUserHistory={readUserHistory} id={id} name={name} history={history} />
          &nbsp;&nbsp;
          <Link to={`/shop/coupon/edit/${id}`}>编辑</Link>
        </div>
      ),
    }],
  })),
)(({ coupons, columns, search, query }) => (
  <div>
    <Search
      placeholder="请输入礼券名称、兑换码进行搜索"
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
