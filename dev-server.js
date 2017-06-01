import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import url from 'url';
import proxy from 'proxy-middleware';

import webpackConfig from './webpack.config.babel';

const emptyMiddleware = (req, res, next) => next();

const compiler = webpack(webpackConfig);

const widthProxy = true;
const proxyOptions = url.parse('http://120.27.230.55/api');
proxyOptions.route = '/api';

browserSync({
  server: {
    baseDir: ['public'],
    routes: {
      '/config.js': 'config/config.js',
    },
    middleware: [
      widthProxy ? proxy(proxyOptions) : emptyMiddleware,
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats,
      }),
      webpackHotMiddleware(compiler),
      connectHistoryApiFallback(),
    ],
  },
});
