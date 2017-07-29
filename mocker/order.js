import { lorem, random, name, phone, address, finance } from 'faker';
import { range, map, propEq, find, prop } from 'lodash/fp';

import { orderStatuses, CLOSED, FINISHED } from '../src/shared/constants/order-status';
import { shippingCompanies } from '../src/shared/constants/shipping-company';
import { paymentMethods } from '../src/shared/constants/payment-method';
import { paymentStatuses } from '../src/shared/constants/payment-status';
import { users } from './user';
import { coupons } from './coupon';
import { products } from './product';

const getItem = values => ({
  id: random.number(),
  name: lorem.words(),
  description: lorem.sentence(),
  quantity: random.number(),
  unitPrice: Number(finance.amount()),
  product: random.arrayElement(products),
  ...values,
});

const getPayment = values => ({
  id: random.number(),
  amount: Number(finance.amount()),
  method: random.arrayElement(paymentMethods),
  status: random.arrayElement(paymentStatuses),
  serialNo: random.number().toString(),
  thirdPartySerialNo: random.number().toString(),
  ...values,
});

const getOrder = values => ({
  id: random.number(),
  orderNo: random.number().toString(),
  name: lorem.words(),
  comment: lorem.sentence(),
  status: random.arrayElement(orderStatuses),
  user: random.arrayElement(users),
  receiverName: name.findName(),
  receiverPhone: phone.phoneNumber(),
  receiverAddress: address.streetAddress(),
  shippingCompany: random.arrayElement(shippingCompanies),
  shippingNumber: random.number().toString(),
  items: map(getItem)(range(1, 5)),
  coupon: random.arrayElement(coupons),
  total: random.number(),
  grandTotal: random.number(),
  payment: getPayment(),
  ...values,
});

export const orders = map(getOrder)(range(1, 50));

export default (router) => {
  router.get('/order/all', (request, response) => {
    response.status(200).send(orders);
  });

  router.get('/order/mine', (request, response) => {
    response.status(200).send(orders);
  });

  router.get('/order/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(id)))(orders),
      ...body,
    });
  });

  router.post('/order/temporary', ({ body }, response) => {
    response.status(200).send(getOrder({
      coupon: find(propEq('id', prop('coupon.id')(body)))(coupons),
    }));
  });

  router.post('/order', ({ body }, response) => {
    response.status(200).send(getOrder(body));
  });

  router.put('/order/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(id)))(orders),
      ...body,
    });
  });

  router.delete('/order/:id', (request, response) => {
    response.status(204).send();
  });

  router.post('/order/:id/action/close', ({ params: { id } }, response) => {
    response.status(200).send({
      id: Number(id),
      status: CLOSED,
    });
  });

  router.post('/order/:id/action/complete', ({ params: { id } }, response) => {
    response.status(200).send({
      id: Number(id),
      status: FINISHED,
    });
  });

  router.put('/order/:id/shipping', ({ params: { id }, body }, response) => {
    response.status(200).send({
      id: Number(id),
      ...body,
    });
  });
};
