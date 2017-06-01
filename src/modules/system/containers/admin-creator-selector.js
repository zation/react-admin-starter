import { flow, find, prop, propEq } from 'lodash/fp';
import { INACTIVE } from 'shared/constants/user-status';
import { ADMIN } from 'shared/constants/user-role';
import { getEntityArray } from 'shared/entities/get-entity';
import getRoleOptions from 'shared/selector-helpers/role-options';

export default state => ({
  initialValues: {
    status: INACTIVE,
    roleKey: flow(
      getEntityArray('role'),
      find(propEq('key', ADMIN)),
      prop('key'),
    )(state),
  },
  roleOptions: getRoleOptions(state),
});
