import { keys } from 'lodash/fp';

import { getPaymentStatusText, FINISHED as PAYMENT_FINISH } from './payment-status';
import getOptions from '../utils/options';

export const PENDING = 'PENDING';
export const SHIPPING = 'SHIPPING';
export const FINISHED = 'FINISHED';
export const CLOSED = 'CLOSED';

const textMap = {
  [FINISHED]: 'Finished',
  [PENDING]: 'Pending',
  [SHIPPING]: 'Shipping',
  [CLOSED]: 'Closed',
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
    return textMap[PENDING];
  }
  return textMap[orderStatus];
};

export const orderStatusOptions = getOptions(textMap);

export const orderStatuses = keys(textMap);
