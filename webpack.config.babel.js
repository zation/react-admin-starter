import path from 'path';
import webpack from 'webpack';
import qs from 'qs';
import autoprefixer from 'autoprefixer';

const DEBUG = process.env.NODE_ENV !== 'production';
const VERBOSE = false;

const plugins = [
  new webpack.DefinePlugin({
    process: {
      env: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    },
    DEBUG: JSON.stringify(DEBUG),
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', '[name].js'),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

if (!DEBUG) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: VERBOSE,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  );
}

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  );
}

const lessLoader = qs.stringify({
  sourceMap: DEBUG,
});

const cssLoaderWithModule = qs.stringify({
  importLoaders: 1,
  modules: true,
  localIdentName: DEBUG ? '[name]_[local]--[hash:base64:5]' : '[hash:base64:5]',
  sourceMap: DEBUG,
});

const cssLoaderWithoutModule = qs.stringify({
  sourceMap: DEBUG,
});

module.exports = {
  entry: {
    app: DEBUG ? [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.js',
    ] : './src/index.js',
    vendor: [
      'classnames',
      'es6-promise',
      'history',
      'js-cookie',
      'moment',
      'normalizr',
      'nprogress',
      'qs',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'recharts',
      'recompose',
      'redux',
      'redux-actions',
      'redux-form',
      'whatwg-fetch',
    ],
  },

  node: {
    __filename: true,
  },

  output: {
    path: path.resolve(__dirname, 'public/__built__'),
    publicPath: '/__built__/',
    filename: '[name].js',
  },

  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'inline-source-map' : false,

  resolve: {
    extensions: ['', '.js'],
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      modules: path.resolve(__dirname, 'src/modules'),
    },
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
    }, {
      test: /\.less$/,
      loader: `style!css?${cssLoaderWithoutModule}!postcss!less?${lessLoader}`,
      include: [
        path.resolve(__dirname, 'node_modules'),
      ],
    }, {
      test: /[^_]\.less$/,
      loader: `style!css?${cssLoaderWithModule}!postcss!less?${lessLoader}`,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
    }, {
      test: /_\.less$/,
      loader: `style!css?${cssLoaderWithoutModule}!postcss!less?${lessLoader}`,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
    }, {
      test: /\.css$/,
      loader: `style!css?${cssLoaderWithoutModule}!postcss`,
    }, {
      test: /\.(png|jpg|jpeg|woff|eot|ttf|woff2|svg)/,
      loader: DEBUG ? 'url-loader' : 'file-loader',
    }],
  },

  postcss: () => [
    autoprefixer({
      browsers: [
        'ie_mob >= 9',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 2.3',
        'bb >= 10',
      ],
    }),
  ],

  plugins,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  profile: true,
};
