'use strict';

var assign = require('lodash').assign;
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
  var opts = assign(defaults, options);
  var plugins = opts.plugins;

  gulp.task('serve', function () {
    browserSync.init(plugins.browserSync);
  });
};
