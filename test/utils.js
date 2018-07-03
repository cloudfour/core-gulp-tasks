'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var Path = require('path');

function path() {
  var segments = [].slice.call(arguments);
  segments.unshift('./test');
  return Path.join.apply(Path, segments);
}

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf8').trim();
}

module.exports = {
  makeDir: function(filepath) {
    return mkdirp.sync(path(filepath));
  },

  readDir: function(filepath) {
    return fs.readdirSync(path(filepath));
  },

  readFixture: function(filename) {
    return readFile(path('fixtures', filename));
  },

  readResult: function(filename) {
    return readFile(path('dist', filename));
  }
};
