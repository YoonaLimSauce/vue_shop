const path = require('path');

module.exports = {
    mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/virtual/',
    filename: 'bundle.js',
  },
  devServer: {
    static: {
        directory: 'www',
      },
    port: 8080,
  }
};