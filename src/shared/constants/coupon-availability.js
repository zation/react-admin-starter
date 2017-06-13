import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const AVAILABLE = 'AVAILABLE';
export const USED = 'USED';
export const EXPIRED = 'EXPIRED';

const textMap = {
  [AVAILABLE]: 'Available',
  [USED]: 'Used',
  [EXPIRED]: 'Expired',
};

export const getCouponAvailabilityText = availability => textMap[availability];

export const couponAvailabilityOptions = getOptions(textMap);

export const couponAvailabilities = keys(textMap);
