'use strict';

var merge = require('lodash').merge;
var cssnano = require('gulp-cssnano');
var cssnext = require('postcss-cssnext');
var gulpif = require('gulp-if');
var importer = require('postcss-import');
var postcss = require('gulp-postcss');
var prefixer = require('postcss-class-prefix');

var defaults = {
  dest: './dist',
  optimize: false,
  name: 'css',
  prefix: false,
  src: './src/main.css'
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var name = opts.name;
  var prefix = opts.prefix;
  // Don't prefix classes formatted as components or utilities.
  var prefixOpts = {ignore: [/^[^A-Zu-]/]};
  var src = opts.src;
  var plugins = [
    importer(),
    cssnext()
  ];

  if (prefix) {
    plugins.push(
      prefixer(prefix, prefixOpts)
    )
  }

  gulp.task(name, () => gulp.src(src)
    .pipe(postcss(plugins))
    .pipe(gulpif(optimize, cssnano()))
    .pipe(gulp.dest(dest)));
};
