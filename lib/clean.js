'use strict';

var assign = require('lodash').assign;
var del = require('del');

var defaults = {
  dest: 'dist'
};

module.exports = function (gulp, options) {
  var opts = assign(defaults, options);
  var dest = opts.dest;

  gulp.task('clean', function (done) {
    del(dest).then(function () {
      done();
    });
  });
};
