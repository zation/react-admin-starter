import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const BLANK = 'BLANK';
export const DEFAULT = 'DEFAULT';

const textMap = {
  [BLANK]: 'In new tab',
  [DEFAULT]: 'In current tab',
};

export const getLinkTargetText = target => textMap[target];

export const linkTargetOptions = getOptions(textMap);

export const linkTargets = keys(textMap);
