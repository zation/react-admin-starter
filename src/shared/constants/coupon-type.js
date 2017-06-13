import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const FIXED = 'FIXED';
export const PERCENTAGE = 'PERCENTAGE';

const textMap = {
  [FIXED]: 'Fixed',
  [PERCENTAGE]: 'Percentage',
};

export const getCouponTypeText = type => textMap[type];

export const couponTypeOptions = getOptions(textMap);

export const couponTypes = keys(textMap);
