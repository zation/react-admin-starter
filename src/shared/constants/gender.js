import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const MALE = 'MALE';
export const FEMALE = 'FEMALE';

const textMap = {
  [MALE]: '男',
  [FEMALE]: '女',
};

export const getGenderText = gender => textMap[gender];

export const genderOptions = getOptions(textMap);

export const genders = keys(textMap);
