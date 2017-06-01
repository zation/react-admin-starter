import { lorem, random, date } from 'faker';
import { range, map, propEq, find } from 'lodash/fp';

import { FIXED, PERCENTAGE } from '../src/shared/constants/coupon-type';
import { couponStatuses, INACTIVE, ACTIVE } from '../src/shared/constants/coupon-status';
import { couponAvailabilities } from '../src/shared/constants/coupon-availability';

const getCoupon = values => {
  const type = random.arrayElement([FIXED, PERCENTAGE]);
  const inventory = random.number();

  return {
    id: random.number(),
    name: lorem.word(),
    type,
    discount: type === FIXED ? random.number() : Math.random(),
    condition: type === FIXED ? random.number() : undefined,
    code: lorem.word(),
    inventory,
    capacity: inventory + random.number(),
    status: random.arrayElement(couponStatuses),
    availability: random.arrayElement(couponAvailabilities),
    expiredAt: random.arrayElement([date.past(), date.future()]),
    ...values,
  };
};

export const coupons = map(getCoupon)(range(1, 50));

export default router => {
  router.get('/coupon/all', (request, response) => {
    response.status(200).send(coupons);
  });

  router.post('/coupon', ({ body }, response) => {
    response.status(200).send(getCoupon(body));
  });

  router.put('/coupon/:id', ({ body, params: { id } }, response) => {
    response.status(200).send({
      ...find(propEq('id', Number(id)))(coupons),
      ...body,
    });
  });

  router.delete('/coupon/:id', (request, response) => {
    response.status(204).send();
  });

  router.post('/coupon/:id/action/activate', ({ params: { id } }, response) => {
    response.status(200).send({ id: Number(id), status: ACTIVE });
  });

  router.post('/coupon/:id/action/deactivate', ({ params: { id } }, response) => {
    response.status(200).send({ id: Number(id), status: INACTIVE });
  });
};
