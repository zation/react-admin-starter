import AdminCreator from './containers/admin-creator';
import AdminList from './containers/admin-list';
import AdminEditor from './containers/admin-editor';
import RoleList from './containers/role-list';
import RoleEditor from './containers/role-editor';
import RoleCreator from './containers/role-creator';
import CustomerList from './containers/customer-list';
import CustomerDetail from './containers/customer-detail';

export default {
  path: '/system',
  children: [{
    path: '/admin',
    children: [{
      path: '/list',
      component: AdminList,
    }, {
      path: '/create',
      component: AdminCreator,
    }, {
      path: '/edit/:userId',
      component: AdminEditor,
    }],
  }, {
    path: '/role',
    children: [{
      path: '/list',
      component: RoleList,
    }, {
      path: '/create',
      component: RoleCreator,
    }, {
      path: '/edit/:roleId',
      component: RoleEditor,
    }],
  }, {
    path: '/customer',
    children: [{
      path: '/list',
      component: CustomerList,
    }, {
      path: '/view/:customerId',
      component: CustomerDetail,
    }],
  }],
};
