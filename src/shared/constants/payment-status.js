import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const PENDING = 'PENDING';
export const FINISHED = 'FINISHED';
export const CLOSED = 'CLOSED';

const textMap = {
  [PENDING]: 'Pending',
  [FINISHED]: 'Finished',
  [CLOSED]: 'Closed',
};

export const getPaymentStatusText = paymentStatus => textMap[paymentStatus];

export const paymentStatusOptions = getOptions(textMap);

export const paymentStatuses = keys(textMap);
