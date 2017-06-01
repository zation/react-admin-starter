import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const PENDING = 'PENDING';
export const FINISHED = 'FINISHED';
export const CLOSED = 'CLOSED';

const textMap = {
  [PENDING]: '等待支付',
  [FINISHED]: '已支付',
  [CLOSED]: '已关闭',
};

export const getPaymentStatusText = paymentStatus => textMap[paymentStatus];

export const paymentStatusOptions = getOptions(textMap);

export const paymentStatuses = keys(textMap);
