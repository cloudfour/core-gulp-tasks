'use strict';

var merge = require('lodash').merge;
var del = require('del');

var defaults = {
  dest: 'dist',
  name: 'clean'
};

module.exports = function(gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var name = opts.name;

  gulp.task(name, () => del(dest));
};
