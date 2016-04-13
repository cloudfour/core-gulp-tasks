'use strict';

var merge = require('lodash').merge;
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

var defaults = {
  src: './assets/*',
  dest: './dist/',
  name: 'assets',
  plugins: {
    imagemin: { optimizationLevel: 0 }
  }
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var plugins = opts.plugins;
  var src = opts.src;
  var name = opts.name;

  gulp.task(name, () => gulp.src(src)
    .pipe(gulpif(optimize, imagemin(plugins.imagemin)))
    .pipe(gulp.dest(dest)));
};
