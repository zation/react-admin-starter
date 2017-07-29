import { lorem, random } from 'faker';
import { range, map, propEq, find } from 'lodash/fp';

const getProductCategory = values => ({
  id: random.number(),
  name: lorem.word(),
  ...values,
});

export const productCategories = map(getProductCategory)(range(1, 5));

export default (router) => {
  router.get('/product-category/all', (request, response) => {
    response.status(200).send(productCategories);
  });

  router.post('/product-category', ({ body }, response) => {
    response.status(200).send(getProductCategory(body));
  });

  router.put('/product-category/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(id)))(productCategories),
      ...body,
    });
  });

  router.delete('/product-category/:id', (request, response) => {
    response.status(204).send();
  });
};
