import { flow, sortBy, prop } from 'lodash/fp';
import { getEntityArray } from 'shared/entities/get-entity';

export default state => ({
  banners: flow(
    getEntityArray('shopBanner'),
    sortBy(prop('order')),
  )(state),
});
