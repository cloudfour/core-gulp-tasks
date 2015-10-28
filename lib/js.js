'use strict';

var merge = require('lodash').merge;
var utils = require('gulp-util');
var webpack = require('webpack');
var PluginError = utils.PluginError;

var defaults = {
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
  }
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var plugins = opts.plugins;
  var optimize = opts.optimize;

  gulp.task('js', function (done) {
    var settings = plugins.webpack;

    if (optimize) {
      settings.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
      );
    }
    webpack(settings, function (err, stats) {
      if (err) throw new PluginError('webpack', err);
      done();
    });
  });
};
