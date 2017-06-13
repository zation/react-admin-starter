import { keys, omit, flow } from 'lodash/fp';

import getOptions from '../utils/options';

export const INACTIVE = 'INACTIVE';
export const ACTIVATING = 'ACTIVATING';
export const ACTIVE = 'ACTIVE';

const textMap = {
  [INACTIVE]: 'Inactive',
  [ACTIVATING]: 'Activating',
  [ACTIVE]: 'Active',
};

export const getUserStatusText = status => textMap[status];

export const userStatusOptions = flow(omit([ACTIVATING]), getOptions)(textMap);

export const userStatuses = keys(textMap);
