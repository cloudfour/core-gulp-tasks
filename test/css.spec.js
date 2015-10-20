'use strict';

var exec = require('child_process').exec;
var tape = require('tape');
var utils = require('./utils');

tape('css task', function (test) {
  var expected = utils.getFixture('output.css');
  test.plan(1);
  exec('gulp css', { cwd: __dirname }, function () {
    var actual = utils.getResult('input.css');
    test.equal(expected, actual, 'Processes CSS files');
  });
});
