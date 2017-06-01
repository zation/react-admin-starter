import { flow, map } from 'lodash/fp';
import { getEntityArray } from '../entities/get-entity';

export default flow(
  getEntityArray('productCategory'),
  map(({ id, name }) => ({
    text: name,
    value: id,
  })),
);
