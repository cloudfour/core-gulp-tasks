'use strict';

var assign = require('lodash').assign;

var defaults = {
  watchers: [
    {
      match: ['src/**/*.css'],
      tasks: ['css']
    }
  ]
};

module.exports = function (gulp, options) {
  var opts = assign(defaults, options);
  var watchers = opts.watchers;

  gulp.task('watch', function () {
    watchers.forEach(function (item) {
      gulp.watch(item.match, item.tasks);
    });
  });
};
