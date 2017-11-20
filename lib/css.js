'use strict';

var merge = require('lodash').merge;
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var importer = require('postcss-import');
var postcss = require('gulp-postcss');
var prefixer = require('postcss-class-prefix');
var use = require('postcss-use');
var foftLoadedClasses = require('postcss-foft-classes');

var defaults = {
  dest: './dist',
  optimize: false,
  name: 'css',
  prefix: false,
  plumb: true,
  src: './src/main.css',
  foftGroups: []
};

/**
 * Hack for PostCSS error recovery.
 *
 * @see https://github.com/floatdrop/gulp-plumber/issues/30#issuecomment-191889730
 */
function plumberHack (done) {
  return {
    errorHandler: error => {
      error.showStack = false;
      gutil.log(error.toString());
      done();
    }
  }
}

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var name = opts.name;
  var prefix = opts.prefix;
  var plumb = opts.plumb;
  var foftGroups = opts.foftGroups || [];
  
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

  gulp.task(name, done => gulp.src(src)
    .pipe(gulpif(plumb, plumber(plumberHack(done))))
    .pipe(postcss(plugins))
    .pipe(gulpif(foftGroups.length, postcss([ foftLoadedClasses({ groups: foftGroups }) ])))
    .pipe(gulpif(optimize, cssnano()))
    .pipe(gulp.dest(dest)));
};
