'use strict';

const merge = require('lodash').merge;
const gutil = require('gulp-util');
const webpack = require('webpack');

const defaults = {
  name: 'js',
  optimize: false,
  plugins: {
    webpack: {
      entry: './src/main.js',
      output: {
        path: './dist',
        filename: 'main.js'
      },
      plugins: []
    }
  },
  logStatsOptions: {
    assets: true,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    timings: false,
    version: false,
    modules: false
  }
};

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const name = opts.name;
  const plugins = opts.plugins;
  const optimize = opts.optimize;

  gulp.task(name, function(done) {
    const settings = plugins.webpack;

    if (optimize) {
      settings.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    webpack(settings, function(err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }

      gutil.log(
        gutil.colors.bold('webpack:'),
        '\n\n',
        stats.toString(opts.logStatsOptions),
        '\n'
      );

      done();
    });
  });
};
