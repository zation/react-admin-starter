import { createAction, actionTypeCreator } from '../../utils/redux-actions';

import { read, put, del, post } from '../request';

const actionType = actionTypeCreator(__filename);
export const READ_ALL = actionType('READ_ALL');
export const READ_ONE = actionType('READ_ONE');
export const UPDATE = actionType('UPDATE');
export const REMOVE = actionType('REMOVE');
export const CREATE = actionType('CREATE');

export const readAll = createAction(
  READ_ALL,
  ({ type, isRecommended } = {}) => read('/content/all', { type, isRecommended }),
);

export const readOne = createAction(
  READ_ONE,
  ({ id }) => read(`/content/${id}`),
);

export const update = createAction(
  UPDATE, ({
    id,
    status,
    isRecommended,
    title,
    cover,
    summary,
    detail,
    externalLink,
    videoId,
    type,
    viewCount,
    favoriteUserIds,
    bookmarkUserIds,
    relatedContentIds,
    tags,
    duration,
    category,
    author,
  }) =>
    put(`/content/${id}`, {
      id,
      status,
      isRecommended,
      title,
      cover,
      summary,
      detail,
      externalLink,
      videoId,
      type,
      viewCount,
      favoriteUserIds,
      bookmarkUserIds,
      relatedContentIds,
      tags,
      duration,
      category,
      author,
    }),
);

export const remove = createAction(
  REMOVE,
  ({ id }) => del(`/content/${id}`),
);

export const create = createAction(
  CREATE, ({
    isRecommended,
    title,
    cover,
    summary,
    detail,
    externalLink,
    videoId,
    type,
    viewCount,
    favoriteUserIds,
    bookmarkUserIds,
    relatedContentIds,
    tags,
    duration,
    category,
    author,
    status,
  }) =>
    post('/content', {
      isRecommended,
      title,
      cover,
      summary,
      detail,
      externalLink,
      videoId,
      type,
      viewCount,
      favoriteUserIds,
      bookmarkUserIds,
      relatedContentIds,
      tags,
      duration,
      category,
      author,
      status,
    }),
);
