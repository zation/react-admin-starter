export const DRAFT = 'DRAFT';
export const PUBLISHED = 'PUBLISHED';
export const DELETED = 'DELETED';

const textMap = {
  [DRAFT]: 'Draft',
  [PUBLISHED]: 'Published',
  [DELETED]: 'Deleted',
};

export const getContentStatusText = status => textMap[status];
