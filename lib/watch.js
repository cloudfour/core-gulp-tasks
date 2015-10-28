'use strict';

var merge = require('lodash').merge;

var defaults = {
  watchers: [
    {
      match: ['src/**/*.css'],
      tasks: ['css']
    }
  ]
};

module.exports = function (gulp, options) {
  var opts = merge({}, defaults, options);
  var watchers = opts.watchers;

  gulp.task('watch', function () {
    watchers.forEach(function (item) {
      gulp.watch(item.match, item.tasks);
    });
  });
};
