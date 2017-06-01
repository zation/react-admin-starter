import { pick, flow, reject, propEq } from 'lodash/fp';
import getEntity, { getEntityArray } from 'shared/entities/get-entity';

export default (state, { params: { order } }) => ({
  initialValues: flow(
    getEntity(`banner.${order}`),
    pick(['image', 'link', 'target']),
  )(state),
  order: Number(order),
  otherBanners: flow(
    getEntityArray('banner'),
    reject(propEq('order', Number(order))),
  )(state),
});
