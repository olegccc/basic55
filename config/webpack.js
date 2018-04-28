const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');
const projectPath = path.join(__dirname, '..');
const sourcePath = path.join(projectPath, 'ui');
const webpack = require('webpack');

module.exports = function (release) {

  const buildPath = path.join(projectPath, release ? 'release' : 'debug');

  return {
    release: release,
    entry: {
      main: ['./ui/index.tsx']
    },
    html: 'ui/index.html',
    output: {
      path: buildPath,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/
          },
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader'
          },
          { test: /\.css$/, use: [
              "style-loader",
              "css-loader",
              "postcss-loader"
            ]
          },
          { test: /\.(png|svg)$/, loader: 'file-loader?name=[name].[ext]'
        }
      ]
    },
    stats: {
      modules: false,
      reasons: false,
      chunks: false,
      hash: false,
      timings: false,
      version: false,
      children: false,
      assets: false,
      colors: true
    }
  };
};
