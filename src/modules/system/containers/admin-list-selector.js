import { flow, reject, prop } from 'lodash/fp';
import { getEntityArray } from 'shared/entities/get-entity';
import { CUSTOMER } from 'shared/constants/user-role';
import getCurrentUser from 'shared/selector-helpers/current-user';

export default state => {
  const currentUserId = flow(
    getCurrentUser,
    prop('id'),
  )(state);

  return {
    users: flow(
      getEntityArray('user'),
      reject(user => {
        const roleKey = prop('role.key')(user);
        const id = prop('id')(user);
        return roleKey === CUSTOMER || id === currentUserId;
      }),
    )(state),
  };
};
