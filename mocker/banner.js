import { internet, random, image } from 'faker';
import { range, map, replace } from 'lodash/fp';
import { linkTargets } from '../src/shared/constants/link-target';

const getBanner = values => ({
  image: replace('/640/480/', '/900/450/')(image.image()),
  link: internet.url(),
  target: random.arrayElement(linkTargets),
  ...values,
});

export const banners = map(order => getBanner({ order }))(range(1, 5));

export default router => {
  router.get('/banner/all', (request, response) => {
    response.status(200).send(banners);
  });

  router.put('/banner', ({ body }, response) => {
    response.status(200).send(body);
  });
};
