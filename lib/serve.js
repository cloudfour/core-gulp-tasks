'use strict';

var merge = require('lodash').merge;
var browserSync = require('browser-sync').create();

var defaults = {
  plugins: {
    browserSync: {
      files: ['**/*'],
      server: { baseDir: 'dist' }
    }
  }
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var plugins = opts.plugins;

  gulp.task('serve', function () {
    browserSync.init(plugins.browserSync);
  });
};
