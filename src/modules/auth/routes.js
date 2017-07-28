import Login from './containers/login';
import Register from './containers/register';

export default {
  path: '/auth',
  children: [{
    path: '/login',
    component: Login,
  }, {
    path: '/register',
    component: Register,
  }],
};
