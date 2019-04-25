'use strict';

const merge = require('lodash').merge;
const del = require('del');

const defaults = {
  dest: 'dist',
  name: 'clean'
};

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const dest = opts.dest;
  const name = opts.name;

  gulp.task(name, () => del(dest));
};
