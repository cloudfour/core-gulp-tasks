'use strict';

var exec = require('child_process').exec;
var tape = require('tape');
var utils = require('./utils');

tape('html task', function(test) {
  test.plan(1);
  exec('gulp html', { cwd: __dirname }, function() {
    var expected = utils.readFixture('output.html');
    var actual = utils.readResult('input.html');
    test.equal(expected, actual, 'Compiles Handlebars templates');
  });
});
