import { random } from 'faker';

import { ADMIN as ADMIN_ROLE, CUSTOMER } from '../src/shared/constants/user-role';
import { MANAGE_ROLE, MANAGE_ADMIN } from '../src/shared/constants/operation';

export const admin = {
  id: 1,
  name: '管理员',
  key: ADMIN_ROLE,
  operations: [],
};

export const customer = {
  id: 2,
  name: '用户',
  key: CUSTOMER,
  operations: [],
};

export const oneRole = {
  id: 3,
  name: '权限组',
  operations: [MANAGE_ROLE, MANAGE_ADMIN],
};

export const anotherRole = {
  id: 4,
  name: '另一个权限组',
  operations: [MANAGE_ADMIN],
};

const roles = [admin, customer, oneRole, anotherRole];

export default router => {
  router.get('/role/all', (request, response) => {
    response.status(200).send(roles);
  });

  router.post('/role', ({ body }, response) => {
    response.status(200).send({
      id: random.number(),
      ...body,
    });
  });

  router.put('/role/:roleId', ({ params: { roleId }, body }, response) => {
    response.status(200).send({
      id: Number(roleId),
      ...body,
    });
  });

  router.delete('/role/:id', (request, response) => {
    response.status(204).send();
  });
};
