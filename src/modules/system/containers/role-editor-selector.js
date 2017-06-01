import { prop } from 'lodash/fp';
import getEntity from 'shared/entities/get-entity';

export default (state, { params: { roleId } }) => {
  const role = getEntity(`role.${roleId}`, state);

  return {
    initialValues: role,
    roleId: prop('id')(role),
  };
};
