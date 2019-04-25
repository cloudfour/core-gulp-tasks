'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('css task', function(test) {
  test.plan(1);
  exec('gulp css', { cwd: __dirname }, function() {
    const expected = utils.readFixture('output.css');
    const actual = utils.readResult('input.css');
    test.equal(expected, actual, 'Processes CSS files');
  });
});
