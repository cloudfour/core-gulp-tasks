'use strict';

import {merge} from 'lodash';
import cssnano from 'gulp-cssnano';
import cssnext from 'postcss-cssnext';
import gulpif from 'gulp-if';
import importer from 'postcss-import';
import postcss from 'gulp-postcss';

var defaults = {
  dest: './dist',
  optimize: false,
  src: './src/main.css'
};

module.exports = (gulp, options) => {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var src = opts.src;

  gulp.task('css', () => gulp.src(src)
    .pipe(postcss([
      importer(),
      cssnext()
    ]))
    .pipe(gulpif(optimize, cssnano()))
    .pipe(gulp.dest(dest)));
};
