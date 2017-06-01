import { getEntityArray } from 'shared/entities/get-entity';

export default (state) => ({
  categories: getEntityArray('productCategory', state),
});
