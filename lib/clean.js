'use strict';

var merge = require('lodash').merge;
var del = require('del');

var defaults = {
  dest: 'dist'
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;

  gulp.task('clean', () => del(dest));
};
