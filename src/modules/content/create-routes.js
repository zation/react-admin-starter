import ArticleList from './containers/article-list';
import ArticleCreator from './containers/article-creator';
import ArticleEditor from './containers/article-editor';

export default () => ({
  path: 'content',
  childRoutes: [{
    path: 'article',
    childRoutes: [{
      path: 'list',
      component: ArticleList,
    }, {
      path: 'create',
      component: ArticleCreator,
    }, {
      path: 'edit/:contentId',
      component: ArticleEditor,
    }],
  }],
});
