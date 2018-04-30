const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackDevConfig = require('../config/webpack.dev.config');

module.exports = function(grunt) {

  grunt.registerMultiTask('webpack', function() {

    const config = this.data || {};
    const done = this.async();

    const compilerConfig = {
      entry: config.entry,
      output: config.output,
      resolve: config.resolve,
      module: config.module,
      stats: config.stats,
      plugins: [],
      mode: config.release ? 'production' : 'development'
    };

    if (config.html) {
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      compilerConfig.plugins.push(new HtmlWebpackPlugin({
        template: config.html,
        inject: false
      }))
    }

    compilerConfig.plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(config.release ? 'production' : 'debug')
      },
      DEBUG: !config.release
    }));

    if (config.release) {
      compilerConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: true,
        compress: {
          warnings: true
        }
      }));
    } else {
      compilerConfig.devtool = 'source-map';
    }

    const compiler = webpack(compilerConfig);

    if (grunt.option('view')) {
      const server = new WebpackDevServer(compiler, webpackDevConfig);
      const portNumber = grunt.config('port');
      server.listen(portNumber, function() {
        console.log('Server started at localhost:' + portNumber);
      });
    } else {
      compiler.run((error, stats) => {
        if (error) {
          grunt.log.error(error);
          done(false);
          return;
        }

        if (stats.hasErrors()) {
          const errors = stats.toJson('errors-only');
          grunt.log.error('Compile errors:');
          errors.errors.forEach(function(error) { grunt.log.error(error); });
          done(false);
          return;
        }

        done();
      });
    }
  });
};
