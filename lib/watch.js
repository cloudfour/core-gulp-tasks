'use strict';

const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const merge = require('lodash').merge;

const defaults = {
  name: 'watch',
  watchers: [
    {
      match: ['src/**/*.css'],
      tasks: ['css']
    }
  ]
};

module.exports = function(gulp, options) {
  const opts = merge({}, defaults, options);
  const watchers = opts.watchers;
  const name = opts.name;

  gulp.task(name, function() {
    watchers.forEach(function(item) {
      watch(item.match, function() {
        runSequence(item.tasks);
      });
    });
  });
};
