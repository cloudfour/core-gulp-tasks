'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('copy task', function(test) {
  test.plan(1);
  exec('gulp copy', { cwd: __dirname }, function() {
    const expected = utils.readFixture('static/favicon.ico');
    const actual = utils.readResult('favicon.ico');
    test.equal(expected, actual, 'Copies asset files');
  });
});
