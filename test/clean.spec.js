'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('clean task', function(test) {
  test.plan(1);
  utils.makeDir('dist/temp');
  exec('gulp clean', { cwd: __dirname }, function() {
    const files = utils.readDir('dist');
    const isClean = files.every(function(filename) {
      return filename !== 'temp';
    });
    test.ok(isClean, 'Cleans up files and folders');
  });
});
