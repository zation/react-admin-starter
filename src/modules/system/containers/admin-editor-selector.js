import { prop } from 'lodash/fp';
import getEntity from 'shared/entities/get-entity';
import getRoleOptions from 'shared/selector-helpers/role-options';

export default (state, { params: { userId } }) => {
  const user = getEntity(`user[${userId}]`, state);

  return {
    initialValues: {
      ...user,
      roleKey: prop('role.key')(user),
    },
    userId: prop('id')(user),
    roleOptions: getRoleOptions(state),
  };
};
