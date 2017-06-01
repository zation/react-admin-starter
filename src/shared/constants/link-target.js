import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const BLANK = 'BLANK';
export const DEFAULT = 'DEFAULT';

const textMap = {
  [BLANK]: '在新页面打开',
  [DEFAULT]: '在本页面打开',
};

export const getLinkTargetText = target => textMap[target];

export const linkTargetOptions = getOptions(textMap);

export const linkTargets = keys(textMap);
