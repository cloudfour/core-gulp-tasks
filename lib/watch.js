'use strict';

var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var merge = require('lodash').merge;

var defaults = {
  name: 'watch',
  watchers: [
    {
      match: ['src/**/*.css'],
      tasks: ['css']
    }
  ]
};

module.exports = function(gulp, options) {
  var opts = merge({}, defaults, options);
  var watchers = opts.watchers;
  var name = opts.name;

  gulp.task(name, function() {
    watchers.forEach(function(item) {
      watch(item.match, function() {
        runSequence(item.tasks);
      });
    });
  });
};
