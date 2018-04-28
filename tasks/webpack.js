const webpack = require('webpack');

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
      plugins: []
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
  });
};
