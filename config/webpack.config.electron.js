const webpack = require('webpack');
const MinifyPlugin = require('uglifyjs-webpack-plugin');
const config = require('./index');
const baseConfig = require('./webpack.config.base');

module.exports = {
  ...baseConfig,

  // https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
  target: 'electron-main',

  devtool: false,

  entry: [
    'babel-polyfill',
    './main.js',
  ],

  output: {
    path: config.dist,
    filename: 'main.js'
  },

  plugins: [
    // Minify the output
    new MinifyPlugin(),

    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  /**
   * Disables webpack processing of __dirname and __filename.
   * If you run the bundle in node.js it falls back to these values of node.js.
   * https://github.com/webpack/webpack/issues/2010
   */
  node: {
    __dirname: false,
    __filename: false
  }
};
