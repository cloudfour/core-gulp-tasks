'use strict';

var merge = require('lodash').merge;
var browserSync = require('browser-sync').create();

var defaults = {
  name: 'serve',
  plugins: {
    browserSync: {
      files: ['**/*'],
      server: { baseDir: 'dist' }
    }
  }
};

module.exports = function(gulp, options) {
  var opts = merge({}, defaults, options);
  var plugins = opts.plugins;
  var name = opts.name;

  gulp.task(name, function() {
    browserSync.init(plugins.browserSync);
  });
};
