var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [
  {
    "test": /\.jsx?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015"
      ],
      "plugins": [
        "syntax-jsx",
        ["transform-react-jsx", { "pragma": "html" }],
        "transform-object-rest-spread",
      ]
    }
  },
  {
    "test": /\.css?$/,
    "loader": "style!css"
  }
];

module.exports = {
  devtool: 'module-source-map',
  entry: path.resolve('src', 'main.jsx'),
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: loaders
  }
};
