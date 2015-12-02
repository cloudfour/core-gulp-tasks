'use strict';

var merge = require('lodash').merge;
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

var defaults = {
  src: './assets/*',
  dest: './dist/',
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

  gulp.task('assets', () => gulp.src(src)
    .pipe(gulpif(optimize, imagemin(plugins.imagemin)))
    .pipe(gulp.dest(dest)));
};
