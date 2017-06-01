import { flow, map, join, reject } from 'lodash/fp';
import { getEntityArray } from 'shared/entities/get-entity';
import { getOperationText } from 'shared/constants/operation';
import { ADMIN, CUSTOMER } from 'shared/constants/user-role';

export default state => ({
  roles: flow(
    getEntityArray('role'),
    reject(({ key }) => key === ADMIN || key === CUSTOMER),
    map(role => ({
      ...role,
      operations: flow(
        map(getOperationText),
        join('、'),
      )(role.operations),
    })),
  )(state),
});
