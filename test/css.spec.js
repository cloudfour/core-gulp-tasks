'use strict';

var exec = require('child_process').exec;
var tape = require('tape');
var utils = require('./utils');

tape('css task', function(test) {
  test.plan(1);
  exec('gulp css', { cwd: __dirname }, function() {
    var expected = utils.readFixture('output.css');
    var actual = utils.readResult('input.css');
    test.equal(expected, actual, 'Processes CSS files');
  });
});
