import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const ALIPAY = 'ALIPAY';
export const WECHAT_PAY = 'WECHAT_PAY';

const textMap = {
  [ALIPAY]: 'Alipay',
  [WECHAT_PAY]: 'Wechat',
};

export const getPaymentMethodText = paymentMethod => textMap[paymentMethod];

export const paymentMethodOptions = getOptions(textMap);

export const paymentMethods = keys(textMap);
