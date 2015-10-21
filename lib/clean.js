'use strict';

var defaultsDeep = require('lodash').defaultsDeep;
var del = require('del');

var defaults = {
  dest: 'dist'
};

module.exports = function (gulp, options) {
  var opts = defaultsDeep(options, defaults);
  var dest = opts.dest;

  gulp.task('clean', function (done) {
    del(dest).then(function () {
      done();
    });
  });
};
