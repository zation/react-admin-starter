import { name, internet, random, date } from 'faker';
import { range, map, flow, concat, find, propEq, nth } from 'lodash/fp';
import { coupons } from './coupon';
import { userStatuses, ACTIVE } from '../src/shared/constants/user-status';
import { genders } from '../src/shared/constants/gender';
import { admin, customer, oneRole, anotherRole } from './role';
import { couponAvailabilities } from '../src/shared/constants/coupon-availability';

const getUser = values => ({
  id: random.number(),
  nickname: name.findName(),
  birthDate: date.past(),
  gender: random.arrayElement(genders),
  username: internet.email(),
  email: internet.email(),
  status: random.arrayElement(userStatuses),
  role: random.arrayElement([admin, customer, oneRole, anotherRole]),
  shippingInfo: {
    city: '110100',
    province: '110000',
    address: '某个地址',
    receiverName: name.findName(),
    receiverPhone: '18728374829',
    zipCode: '1100100',
  },
  coupons: map((index) => ({
    id: random.number(),
    createdAt: date.past(),
    updatedAt: date.past(),
    availability: random.arrayElement(couponAvailabilities),
    coupon: nth(index)(coupons),
  }))(range(1, 5)),
  ...values,
});

export const currentUser = getUser({ status: ACTIVE, role: admin });
export const users = flow(
  map(getUser),
  concat(currentUser),
)(range(1, 40));

export default router => {
  router.get('/user/mine', (request, response) => {
    response.status(200).send(currentUser);
  });

  router.get('/user/all', (request, response) => {
    response.status(200).send(users);
  });

  router.get('/user/:userId', ({ params: { userId } }, response) => {
    response.status(200).send(find(propEq('id', Number(userId)))(users));
  });

  router.put('/user/:userId', ({ params: { userId }, body }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(userId)))(users),
      ...body,
    });
  });

  router.post('/user', ({ body }, response) => {
    response.status(200).send(getUser(body));
  });

  router.post('/user/action/request-reset-password', (request, response) => {
    response.status(204).send();
  });

  router.post('/user/action/reset-password', (request, response) => {
    response.status(204).send();
  });

  router.post('/user/:id/action/reset-password', (request, response) => {
    response.status(204).send();
  });

  router.post('/user/:id/action/activate', (request, response) => {
    response.status(204).send();
  });

  router.post('/user/action/request-activate', (request, response) => {
    response.status(204).send();
  });

  router.delete('/user/:id', (request, response) => {
    response.status(204).send();
  });
};
