import getEntity, { getEntityArray } from 'shared/entities/get-entity';

export default (state) => ({
  initialValues: getEntity('shippingFee')(state),
});
