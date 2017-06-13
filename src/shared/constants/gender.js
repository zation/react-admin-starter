import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const MALE = 'MALE';
export const FEMALE = 'FEMALE';

const textMap = {
  [MALE]: 'Male',
  [FEMALE]: 'Female',
};

export const getGenderText = gender => textMap[gender];

export const genderOptions = getOptions(textMap);

export const genders = keys(textMap);
