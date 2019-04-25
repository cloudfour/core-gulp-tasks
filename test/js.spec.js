'use strict';

const exec = require('child_process').exec;
const tape = require('tape');
const utils = require('./utils');

tape('js task', function(test) {
  test.plan(1);
  exec('gulp js', { cwd: __dirname }, function() {
    const result = utils.readResult('main.js');
    const isTranspiled = result.indexOf('/******/') === 0;
    test.ok(isTranspiled, 'Transpiles and resolves dependencies');
  });
});
