import Profile from './containers/profile';
import Password from './containers/password';

export default {
  path: '/account',
  children: [{
    path: '/profile',
    component: Profile,
  }, {
    path: '/password',
    component: Password,
  }],
};
