'use strict';

var merge = require('lodash').merge;
var gutil = require('gulp-util');
var webpack = require('webpack');

var defaults = {
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
  var opts = merge({}, defaults, options);
  var name = opts.name;
  var plugins = opts.plugins;
  var optimize = opts.optimize;

  gulp.task(name, function(done) {
    var settings = plugins.webpack;

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
