'use strict';

var assign = require('lodash').assign;
var cssnano = require('gulp-cssnano');
var cssnext = require('postcss-cssnext');
var gulpif = require('gulp-if');
var importer = require('postcss-import');
var postcss = require('gulp-postcss');

var defaults = {
  dest: './dist',
  optimize: false,
  src: './src/main.css'
};

module.exports = function (gulp, options) {
  var opts = assign(defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var src = opts.src;

  gulp.task('css', function () {
    return gulp.src(src)
      .pipe(postcss([
        importer(),
        cssnext()
      ]))
      .pipe(gulpif(optimize, cssnano()))
      .pipe(gulp.dest(dest));
  });
};
