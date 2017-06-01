import { lorem, random, image, finance } from 'faker';
import { range, map, propEq, find, replace } from 'lodash/fp';

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
    detail: lorem.paragraph(),
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

export default router => {
  router.get('/product/all', (request, response) => {
    response.status(200).send(products);
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
