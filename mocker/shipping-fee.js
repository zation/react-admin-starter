import { finance } from 'faker';

const getShippingFee = () => ({
  shippingFee: Number(finance.amount()),
  noShippingFeePrice: Number(finance.amount()),
});

export default router => {
  router.get('/shop/shipping-fee', (request, response) => {
    response.status(200).send(getShippingFee());
  });

  router.put('/shop/shipping-fee', ({ body }, response) => {
    response.status(200).send(body);
  });
};
