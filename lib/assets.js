'use strict';

import {merge} from 'lodash';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';

const defaults = {
  src: './assets/*',
  dest: './dist/',
  plugins: {
    imagemin: { optimizationLevel: 0 }
  }
};

module.exports = (gulp, options) => {
  const opts = merge({}, defaults, options);
  const dest = opts.dest;
  const optimize = opts.optimize;
  const plugins = opts.plugins;
  const src = opts.src;

  gulp.task('assets', () => {
    return gulp.src(src)
      .pipe(gulpif(optimize, imagemin(plugins.imagemin)))
      .pipe(gulp.dest(dest));
  });
};
