'use strict';

import {merge} from 'lodash';
import del from 'del';

var defaults = {
  dest: 'dist'
};

module.exports = (gulp, options) => {
  var opts = merge({}, defaults, options);
  var dest = opts.dest;

  gulp.task('clean', done => {
    del(dest)
      .then(() => done());
  });
};
