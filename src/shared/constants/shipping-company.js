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
  [SF]: 'SF',
  [TTK]: 'Tiantian',
  [YTO]: 'Yuantong',
  [ZTO]: 'Zhongtong',
  [YUNDA]: 'Yunda',
  [STO]: 'Shentong',
  [EMS]: 'EMS',
  [HT]: 'Huitong',
  [ZJS]: 'Zhaijisong',
  [DEP]: 'Debang',
  [DHL]: 'DHL',
  [UC]: 'UC',
};

export const getShippingCompanyText = shippingCompany => textMap[shippingCompany];

export const shippingCompanyOptions = getOptions(textMap);

export const shippingCompanies = keys(textMap);
