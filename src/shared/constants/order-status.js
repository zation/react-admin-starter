import { keys } from 'lodash/fp';

import { getPaymentStatusText, FINISHED as PAYMENT_FINISH } from './payment-status';
import getOptions from '../utils/options';

export const PENDING = 'PENDING';
export const SHIPPING = 'SHIPPING';
export const FINISHED = 'FINISHED';
export const CLOSED = 'CLOSED';

const textMap = {
  [FINISHED]: '已完成',
  [PENDING]: '待支付',
  [SHIPPING]: '待收货',
  [CLOSED]: '已关闭',
};

export const getOrderStatusText = (
  orderStatus,
  paymentStatus,
  shippingCompany,
  shippingNumber,
) => {
  if (orderStatus === PENDING && paymentStatus === PAYMENT_FINISH) {
    return getPaymentStatusText(paymentStatus);
  }
  if (orderStatus === SHIPPING && !shippingCompany && !shippingNumber) {
    return '待发货';
  }
  return textMap[orderStatus];
};

export const orderStatusOptions = getOptions(textMap);

export const orderStatuses = keys(textMap);
