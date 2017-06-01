export const DRAFT = 'DRAFT';
export const PUBLISHED = 'PUBLISHED';
export const DELETED = 'DELETED';

const textMap = {
  [DRAFT]: '未发布',
  [PUBLISHED]: '已发布',
  [DELETED]: '已删除',
};

export const getContentStatusText = status => textMap[status];
