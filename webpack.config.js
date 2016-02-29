const webpack = require('webpack');

module.exports = {
  entry: './browser/main.js',
  output: { path: __dirname, filename: './static/bundle.js' },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
};
