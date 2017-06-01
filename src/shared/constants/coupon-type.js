import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const FIXED = 'FIXED';
export const PERCENTAGE = 'PERCENTAGE';

const textMap = {
  [FIXED]: '满减',
  [PERCENTAGE]: '折扣',
};

export const getCouponTypeText = type => textMap[type];

export const couponTypeOptions = getOptions(textMap);

export const couponTypes = keys(textMap);
