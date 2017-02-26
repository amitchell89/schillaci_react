var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/dist');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: "../img/"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', 'png', 'svg'],
    modulesDirectories: ['node_modules']
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader: "babel-loader", 
        query:
          {
            presets:['react', 'es2015']
          }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|svg|ttf|woff|woff2)$/i,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};

module.exports = config;