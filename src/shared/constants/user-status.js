import { keys, omit, flow } from 'lodash/fp';

import getOptions from '../utils/options';

export const INACTIVE = 'INACTIVE';
export const ACTIVATING = 'ACTIVATING';
export const ACTIVE = 'ACTIVE';

const textMap = {
  [INACTIVE]: '未激活',
  [ACTIVATING]: '邮件激活中',
  [ACTIVE]: '已激活',
};

export const getUserStatusText = status => textMap[status];

export const userStatusOptions = flow(omit([ACTIVATING]), getOptions)(textMap);

export const userStatuses = keys(textMap);
