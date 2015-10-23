'use strict';

var defaultsDeep = require('lodash').defaultsDeep;
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
  var opts = defaultsDeep(options, defaults);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var plugins = opts.plugins;
  var src = opts.src;

  gulp.task('assets', function () {
    return gulp.src(src)
      .pipe(gulpif(optimize, imagemin(plugins.imagemin)))
      .pipe(gulp.dest(dest));
  });
};
