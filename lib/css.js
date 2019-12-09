'use strict';

const merge = require('lodash').merge;
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const importer = require('postcss-import');
const postcss = require('gulp-postcss');
const prefixer = require('postcss-class-prefix');
const use = require('postcss-use');
const foftLoadedClasses = require('postcss-foft-classes');

const defaults = {
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
function plumberHack(done) {
  return {
    errorHandler: error => {
      error.showStack = false;
      gutil.log(error.toString());
      done();
    }
  };
}

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const dest = opts.dest;
  const optimize = opts.optimize;
  const name = opts.name;
  const prefix = opts.prefix;
  const plumb = opts.plumb;
  const foftGroups = opts.foftGroups || [];

  // Don't prefix classes formatted as components, utilities or states.
  const prefixOpts = {
    ignore: [/^[^-A-Zu]/, /^(is|has)-/]
  };
  const src = opts.src;
  const plugins = [importer(), use({ modules: '*', resolveFromFile: true })];

  if (prefix) {
    plugins.push(prefixer(prefix, prefixOpts));
  }

  gulp.task(name, done =>
    gulp
      .src(src)
      .pipe(gulpif(plumb, plumber(plumberHack(done))))
      .pipe(postcss(plugins))
      .pipe(
        gulpif(
          foftGroups.length,
          postcss([foftLoadedClasses({ groups: foftGroups })])
        )
      )
      .pipe(gulpif(optimize, cssnano()))
      .pipe(gulp.dest(dest))
  );
};
