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
  var opts = merge({}, defaults, options);
  var dest = opts.dest;
  var optimize = opts.optimize;
  var plugins = opts.plugins;
  var src = opts.src;

  gulp.task('assets', () => gulp.src(src)
                              .pipe(gulpif(optimize, imagemin(plugins.imagemin)))
                              .pipe(gulp.dest(dest)));
};
