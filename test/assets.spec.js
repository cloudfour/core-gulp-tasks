'use strict';

var exec = require('child_process').exec;
var tape = require('tape');
var utils = require('./utils');

tape('assets task', function (test) {
  test.plan(1);
  exec('gulp assets', { cwd: __dirname }, function () {
    var expected = utils.readFixture('assets/favicon.ico');
    var actual = utils.readResult('favicon.ico');
    test.equal(expected, actual, 'Copies asset files');
  });
});
