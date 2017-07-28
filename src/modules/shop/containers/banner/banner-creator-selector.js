import { prop, max, map, flow } from 'lodash/fp';
import { getEntityArray } from 'shared/entities/get-entity';

export default (state) => {
  const banners = getEntityArray('shopBanner')(state);

  return {
    banners,
    maxOrder: flow(
      map(prop('order')),
      max,
    )(banners) || 0,
  };
};
