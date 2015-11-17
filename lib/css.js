'use strict';

import {merge} from 'lodash';
import cssnano from 'gulp-cssnano';
import cssnext from 'postcss-cssnext';
import gulpif from 'gulp-if';
import importer from 'postcss-import';
import postcss from 'gulp-postcss';

const defaults = {
  dest: './dist',
  optimize: false,
  src: './src/main.css'
};

module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options);
  const dest = opts.dest;
  const optimize = opts.optimize;
  const src = opts.src;

  gulp.task('css', () => {
    return gulp.src(src)
      .pipe(postcss([
        importer(),
        cssnext()
      ]))
      .pipe(gulpif(optimize, cssnano()))
      .pipe(gulp.dest(dest));
  });
};
