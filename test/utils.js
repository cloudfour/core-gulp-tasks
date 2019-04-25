'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const Path = require('path');

function path(...args) {
  const segments = [].slice.call(args);
  segments.unshift('./test');
  return Path.join(...segments);
}

function readFile(filepath) {
  return fs.readFileSync(filepath, 'utf8').trim();
}

module.exports = {
  makeDir(filepath) {
    return mkdirp.sync(path(filepath));
  },

  readDir(filepath) {
    return fs.readdirSync(path(filepath));
  },

  readFixture(filename) {
    return readFile(path('fixtures', filename));
  },

  readResult(filename) {
    return readFile(path('dist', filename));
  }
};
