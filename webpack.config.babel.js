import path from 'path';
import webpack from 'webpack';

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
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].js',
  }),
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
];

if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: VERBOSE,
      },
      output: {
        comments: false,
      },
    }),
  );
}

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
}

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
  devtool: DEBUG ? 'eval-source-map' : false,

  resolve: {
    alias: {
      shared: path.resolve(__dirname, 'src/shared'),
      modules: path.resolve(__dirname, 'src/modules'),
    },
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
    }, {
      test: /\.less$/,
      include: [
        path.resolve(__dirname, 'node_modules'),
      ],
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: DEBUG,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: DEBUG,
          },
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: DEBUG,
          },
        },
      ],
    }, {
      test: /[^_]\.less$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]--[hash:base64:5]' : '[hash:base64:5]',
            sourceMap: DEBUG,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: DEBUG,
          },
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: DEBUG,
          },
        },
      ],
    }, {
      test: /_\.less$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      use: [
        'style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: DEBUG,
          },
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: DEBUG,
          },
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: DEBUG,
          },
        },
      ],
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: DEBUG,
          },
        },
        'postcss-loader',
      ],
    }, {
      test: /\.(png|jpg|jpeg|woff|eot|ttf|woff2|svg)/,
      loader: DEBUG ? 'url-loader' : 'file-loader',
    }],
  },

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
