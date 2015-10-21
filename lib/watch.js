'use strict';

var defaultsDeep = require('lodash').defaultsDeep;

var defaults = {
  watchers: [
    {
      match: ['src/**/*.css'],
      tasks: ['css']
    }
  ]
};

module.exports = function (gulp, options) {
  var opts = defaultsDeep(options, defaults);
  var watchers = opts.watchers;

  gulp.task('watch', function () {
    watchers.forEach(function (item) {
      gulp.watch(item.match, item.tasks);
    });
  });
};
