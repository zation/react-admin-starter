import BannerCreator from './containers/banner-creator';
import BannerList from './containers/banner-list';
import BannerEditor from './containers/banner-editor';

export default () => ({
  path: 'asset',
  childRoutes: [{
    path: 'banner',
    childRoutes: [{
      path: 'create',
      component: BannerCreator,
    }, {
      path: 'list',
      component: BannerList,
    }, {
      path: 'edit/:order',
      component: BannerEditor,
    }],
  }],
});
