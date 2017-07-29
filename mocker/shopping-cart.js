import { random } from 'faker';
import { range, map, find, propEq, sumBy } from 'lodash/fp';

import { products } from './product';

const getShoppingCartItem = values => ({
  id: random.number(),
  product: random.arrayElement(products),
  quantity: random.number(),
  ...values,
});

const items = map(getShoppingCartItem)(range(1, 5));

export const shoppingCart = {
  items,
  total: sumBy(({ product: { price }, quantity }) => price * quantity)(items),
};

export default (router) => {
  router.get('/shopping-cart/mine', (request, response) => {
    response.status(200).send(shoppingCart);
  });

  router.post('/shopping-cart/min/item', ({ body }, response) => {
    response.status(200).send(getShoppingCartItem(body));
  });

  router.put('/shopping-cart/mine/item/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({
      ...find(propEq('id')(Number(id)))(shoppingCart),
      ...body,
    });
  });

  router.delete('/shopping-cart/mine/item/:id', (request, response) => {
    response.status(204).send();
  });

  router.post('/shopping-cart/mine/action/clear', (request, response) => {
    response.status(204).send();
  });
};
