'use strict';

var exec = require('child_process').exec;
var tape = require('tape');
var utils = require('./utils');

tape('js task', function(test) {
  test.plan(1);
  exec('gulp js', { cwd: __dirname }, function() {
    var result = utils.readResult('main.js');
    var isTranspiled = result.indexOf('/******/') === 0;
    test.ok(isTranspiled, 'Transpiles and resolves dependencies');
  });
});
