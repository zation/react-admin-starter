import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const INACTIVE = 'INACTIVE';
export const ACTIVE = 'ACTIVE';

const textMap = {
  [INACTIVE]: 'Inactive',
  [ACTIVE]: 'Active',
};

export const getCouponStatusText = status => textMap[status];

export const couponStatusOptions = getOptions(textMap);

export const couponStatuses = keys(textMap);
