'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('html task', function(test) {
  test.plan(1);
  exec('gulp html', { cwd: __dirname }, function() {
    const expected = utils.readFixture('output.html');
    const actual = utils.readResult('input.html');
    test.equal(expected, actual, 'Compiles Handlebars templates');
  });
});
