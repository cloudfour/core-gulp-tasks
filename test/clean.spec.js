'use strict';

var exec = require('child_process').exec;
var tape = require('tape');
var utils = require('./utils');

tape('clean task', function(test) {
  test.plan(1);
  utils.makeDir('dist/temp');
  exec('gulp clean', { cwd: __dirname }, function() {
    var files = utils.readDir('dist');
    var isClean = files.every(function(filename) {
      return filename !== 'temp';
    });
    test.ok(isClean, 'Cleans up files and folders');
  });
});
