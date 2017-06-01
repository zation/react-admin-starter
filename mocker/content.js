import { random, lorem, image, date, name } from 'faker';
import {
  range,
  map,
  flow,
  identity,
  filter,
  propEq,
  find,
  replace,
  prop,
} from 'lodash/fp';
import { DRAFT, PUBLISHED, DELETED } from '../src/shared/constants/content-status';
import { getRandomUsers, getRandomUserIds } from './utils';

const tags = [lorem.word(), lorem.word(), lorem.word(), lorem.word()];

const getContent = values => ({
  id: random.number(),
  status: random.arrayElement([DRAFT, PUBLISHED, DELETED]),
  isRecommended: random.arrayElement([true, false]),
  title: lorem.words(),
  author: name.findName(),
  cover: replace('/640/480/', '/900/450/')(image.image()),
  detail: lorem.paragraph(),
  viewCount: random.number(),
  favoriteUserIds: getRandomUserIds(),
  bookmarkUserIds: getRandomUserIds(),
  tags: filter(() => Math.random() > 0.5)(tags),
  createdAt: date.past(),
  updatedAt: date.past(),
  comments: map(({ nickname, username }) => ({
    id: random.number(),
    comment: lorem.sentences(),
    user: {
      nickname,
      username,
    },
    createdAt: date.past(),
  }))(getRandomUsers()),
  ...values,
});

export const contents = map(getContent)(range(1, 40));

export default router => {
  router.get('/content/all', ({ query: { type, isRecommended } }, response) => {
    response.status(200).send(flow(
      type ? filter(propEq('type', type)) : identity,
      isRecommended ? filter(propEq('isRecommended', isRecommended === 'true')) : identity,
      map((content) => ({
        ...content,
        relatedContentIds: flow(
          map(prop('id')),
          filter(() => Math.random() > 0.7),
        )(contents),
      })),
    )(contents));
  });

  router.get('/content/:contentId', ({ params: { contentId } }, response) => {
    response.status(200).send(find(propEq('id', Number(contentId)))(contents));
  });

  router.post('/content', ({ body }, response) => {
    response.status(200).send(getContent({
      ...body,
      status: DRAFT,
    }));
  });

  router.delete('/content/:contentId', (request, response) => {
    response.status(204).send();
  });

  router.put('/content/:contentId', ({ params: { contentId }, body }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(contentId)))(contents),
      ...body,
    });
  });

  router.post('/content/:contentId/action/comment', (request, response) => {
    response.status(200).send({
      id: random.number(),
    });
  });

  router.post('/content/:contentId/action/favorite', (request, response) => {
    response.status(204).send();
  });

  router.post('/content/:contentId/action/cancel-favorite', (request, response) => {
    response.status(204).send();
  });

  router.post('/content/:contentId/action/bookmark', (request, response) => {
    response.status(204).send();
  });

  router.post('/content/:contentId/action/cancel-bookmark', (request, response) => {
    response.status(204).send();
  });
};
