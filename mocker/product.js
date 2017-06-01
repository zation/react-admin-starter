import { lorem, random, image, finance } from 'faker';
import { isUndefined, range, map, prop, propEq, reject, find, flow, replace } from 'lodash/fp';

import { productCategories } from './product-category';
import { productStatuses } from '../src/shared/constants/product-status';

const getProduct = values => {
  const originalPrice = Number(finance.amount());
  const price = originalPrice - Number(finance.amount());

  return {
    id: random.number(),
    name: lorem.word(),
    cover: image.image(),
    images: map(() => replace('http://', '')(image.image()))(range(1, 6)),
    contentImages: map(() => image.image())(range(1, 8)),
    price: price < 0 ? originalPrice : price,
    originalPrice,
    inventory: random.number(),
    capacity: random.number() * 2,
    status: random.arrayElement(productStatuses),
    isRecommended: random.boolean(),
    productCategory: random.arrayElement(productCategories),
    ...values,
  };
};

export const products = map(getProduct)(range(1, 100));

export const productsWithBook = reject(flow(
  prop('book'),
  isUndefined,
))(products);

export const productsWithPaintingMaterial = reject(flow(
  prop('paintingMaterial'),
  isUndefined,
))(products);

export default router => {
  router.get('/product/all', ({ query }, response) => {
    let result = products;
    if (query && query.type === 'BOOK') {
      result = productsWithBook;
    } else if (query && query.type === 'OTHER') {
      result = productsWithPaintingMaterial;
    }

    response.status(200).send(result);
  });

  router.get('/product/:id', ({ params: { id } }, response) => {
    response.status(200).send(find(propEq('id', Number(id)))(products));
  });

  router.post('/product', ({ body }, response) => {
    response.status(200).send(getProduct(body));
  });

  router.put('/product/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(id)))(products),
      ...body,
    });
  });

  router.delete('/product/:id', (request, response) => {
    response.status(204).send();
  });
};
