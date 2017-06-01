import { flow, map, reject } from 'lodash/fp';
import { getEntityArray } from '../entities/get-entity';
import { ADMIN, CUSTOMER } from '../constants/user-role';

export default flow(
  getEntityArray('role'),
  reject(({ key }) => key === ADMIN || key === CUSTOMER),
  map(({ name, key }) => ({
    text: name,
    value: key,
  })),
);
