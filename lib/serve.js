'use strict';

var defaultsDeep = require('lodash').defaultsDeep;
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
  var opts = defaultsDeep(options, defaults);
  var plugins = opts.plugins;

  gulp.task('serve', function () {
    browserSync.init(plugins.browserSync);
  });
};
