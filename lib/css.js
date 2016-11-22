'use strict';

var merge = require('lodash').merge;
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var importer = require('postcss-import');
var postcss = require('gulp-postcss');
var prefixer = require('postcss-class-prefix');
var use = require('postcss-use');

var defaults = {
  dest: './dist',
  optimize: false,
  name: 'css',
  prefix: false,
  plumb: true,
  src: './src/main.css'
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var name = opts.name;
  var prefix = opts.prefix;
  var plumb = opts.plumb;
  // Don't prefix classes formatted as components, utilities or states.
  var prefixOpts = {
    ignore: [
      /^[^A-Zu-]/,
      /^(is|has)-/
    ]
  };
  var src = opts.src;
  var plugins = [
    importer(),
    use({modules: '*'})
  ];

  if (prefix) {
    plugins.push(
      prefixer(prefix, prefixOpts)
    )
  }

  gulp.task(name, () => gulp.src(src)
    .pipe(gulpif(plumb, plumber()))
    .pipe(postcss(plugins))
    .pipe(gulpif(optimize, cssnano()))
    .pipe(gulp.dest(dest)));
};
