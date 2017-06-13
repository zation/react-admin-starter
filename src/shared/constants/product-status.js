import { keys } from 'lodash/fp';

import getOptions from '../utils/options';

export const DRAFT = 'DRAFT';
export const PUBLISHED = 'PUBLISHED';
export const DELETED = 'DELETED';

const textMap = {
  [DRAFT]: 'Draft',
  [PUBLISHED]: 'Published',
  [DELETED]: 'Deleted',
};

export const getProductStatusText = status => textMap[status];

export const productStatusOptions = getOptions(textMap);

export const productStatuses = keys(textMap);
