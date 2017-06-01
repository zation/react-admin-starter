import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const AVAILABLE = 'AVAILABLE';
export const USED = 'USED';
export const EXPIRED = 'EXPIRED';

const textMap = {
  [AVAILABLE]: '可用',
  [USED]: '已用',
  [EXPIRED]: '过期',
};

export const getCouponAvailabilityText = availability => textMap[availability];

export const couponAvailabilityOptions = getOptions(textMap);

export const couponAvailabilities = keys(textMap);
