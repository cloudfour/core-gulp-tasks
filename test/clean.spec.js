'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var mkdirp = require('mkdirp');
var tape = require('tape');

tape('clean task', function (test) {
  test.plan(1);
  mkdirp.sync('./test/dist/temp');
  exec('gulp clean', { cwd: __dirname }, function () {
    var files = fs.readdirSync('./test/dist');
    var isClean = files.every(function (filename) {
      return filename !== 'temp';
    });
    test.ok(isClean, 'Cleans up files and folders');
  });
});
