import ContentList from './containers/content-list';
import ContentCreator from './containers/content-creator';
import ContentEditor from './containers/content-editor';

export default () => ({
  path: 'content',
  childRoutes: [{
    path: 'list',
    component: ContentList,
  }, {
    path: 'create',
    component: ContentCreator,
  }, {
    path: 'edit/:contentId',
    component: ContentEditor,
  }],
});
