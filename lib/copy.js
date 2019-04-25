'use strict';

const merge = require('lodash').merge;

const defaults = {
  src: './static/*',
  dest: './dist/',
  name: 'copy'
};

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const dest = opts.dest;
  const src = opts.src;
  const name = opts.name;

  gulp.task(name, () => gulp.src(src).pipe(gulp.dest(dest)));
};
