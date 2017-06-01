import { pick, flow, reject, propEq } from 'lodash/fp';
import getEntity, { getEntityArray } from 'shared/entities/get-entity';

export default (state, { params: { order } }) => ({
  initialValues: flow(
    getEntity(`shopBanner.${order}`),
    pick(['image', 'link', 'target']),
  )(state),
  order: Number(order),
  otherBanners: flow(
    getEntityArray('shopBanner'),
    reject(propEq('order', Number(order))),
  )(state),
});
