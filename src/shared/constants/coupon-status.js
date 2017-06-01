import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const INACTIVE = 'INACTIVE';
export const ACTIVE = 'ACTIVE';

const textMap = {
  [INACTIVE]: '不可领取',
  [ACTIVE]: '可领取',
};

export const getCouponStatusText = status => textMap[status];

export const couponStatusOptions = getOptions(textMap);

export const couponStatuses = keys(textMap);
