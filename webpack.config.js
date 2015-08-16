var path = require("path");
var webpack = require('webpack')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./app/data')

module.exports = {
  entry: './entry.js',
  resolve: {
    root: [path.join(__dirname, "bower_components")]
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/deploy',
    libraryTarget: 'umd'
  },

  module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules|bower_components/, loader: 'babel-loader' },
        { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
        {
          test: /\.scss$/,
          loaders: [
            "css-loader",
            "autoprefixer-loader?browsers=last 2 version",
            "sass-loader"
          ],
        },
      ],
    },

  plugins: [
    new StaticSiteGeneratorPlugin('bundle.js', data.routes, data),
    new webpack.NoErrorsPlugin(),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    )
  ],

}
