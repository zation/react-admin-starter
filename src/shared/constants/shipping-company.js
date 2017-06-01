import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const SF = 'SF';
export const TTK = 'TTK';
export const YTO = 'YTO';
export const ZTO = 'ZTO';
export const YUNDA = 'YUNDA';
export const STO = 'STO';
export const EMS = 'EMS';
export const DEP = 'DEP';
export const ZJS = 'ZJS';
export const DHL = 'DHL';
export const UC = 'UC';
export const HT = 'HT';

const textMap = {
  [SF]: '顺丰速运',
  [TTK]: '天天快递',
  [YTO]: '圆通速递',
  [ZTO]: '中通速递',
  [YUNDA]: '韵达快运',
  [STO]: '申通快递',
  [EMS]: 'EMS邮政特快专递',
  [HT]: '汇通快运',
  [ZJS]: '宅急送',
  [DEP]: '德邦快递',
  [DHL]: 'DHL中外运敦豪',
  [UC]: '优速快递',
};

export const getShippingCompanyText = shippingCompany => textMap[shippingCompany];

export const shippingCompanyOptions = getOptions(textMap);

export const shippingCompanies = keys(textMap);
