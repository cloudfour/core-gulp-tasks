'use strict';

const merge = require('lodash').merge;
const browserSync = require('browser-sync').create();

const defaults = {
  name: 'serve',
  plugins: {
    browserSync: {
      files: ['**/*'],
      server: { baseDir: 'dist' }
    }
  }
};

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const plugins = opts.plugins;
  const name = opts.name;

  gulp.task(name, function() {
    browserSync.init(plugins.browserSync);
  });
};
