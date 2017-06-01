import Login from './containers/login';
import Register from './containers/register';
import Layout from './components/layout';

export default () => ({
  path: 'auth',
  component: Layout,
  childRoutes: [{
    path: 'login',
    component: Login,
  }, {
    path: 'register',
    component: Register,
  }],
});
