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
          presets: ['es2015', 'react'],
          plugins: [
            'react-require'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
          test: /\.(jpg|jpeg|gif|png)$/,
          exclude: /node_modules/,
          loader:'url-loader?limit=1024&name=static/[name].[ext]'
      },
      {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          loader: 'url-loader?limit=1024&name=static/[name].[ext]'
      }
    ]
  },
};
