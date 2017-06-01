import React, { PropTypes } from 'react';
import { Modal, Table, Button } from 'antd';
import { compose, setDisplayName, setPropTypes, withState } from 'recompose';

import { time } from 'shared/utils/formatter';
import { getCouponAvailabilityText } from 'shared/constants/coupon-availability';

const columns = [{
  title: '用户名',
  dataIndex: 'user.username',
  key: 'username',
}, {
  title: '兑换时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render: time(),
}, {
  title: '状态',
  dataIndex: 'availability',
  key: 'availability',
  render: getCouponAvailabilityText,
}];

export default compose(
  setDisplayName(__filename),
  setPropTypes({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    readUserHistory: PropTypes.func.isRequired,
  }),
  withState('visible', 'setVisible', false),
  withState('loading', 'setLoading', false),
)(({
  history,
  setVisible,
  visible,
  id,
  name,
  readUserHistory,
  loading,
  setLoading,
}) => (
  <span>
    <a
      onClick={() => {
        setVisible(true);
        setLoading(true);
        readUserHistory({ id }).then(() => setLoading(false));
      }}
    >
      兑换记录
    </a>
    <Modal
      visible={visible}
      title={name}
      footer={<Button onClick={() => setVisible(false)}>关闭</Button>}
      onCancel={() => setVisible(false)}
    >
      <Table dataSource={history} columns={columns} loading={loading} rowKey="id" />
    </Modal>
  </span>
));
