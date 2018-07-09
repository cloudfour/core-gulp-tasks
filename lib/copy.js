'use strict';

var merge = require('lodash').merge;

var defaults = {
  src: './static/*',
  dest: './dist/',
  name: 'copy'
};

module.exports = function(gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var src = opts.src;
  var name = opts.name;

  gulp.task(name, () => gulp.src(src).pipe(gulp.dest(dest)));
};
