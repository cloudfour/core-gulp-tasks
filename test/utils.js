'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
  getFile: function (filepath) {
    return fs.readFileSync(filepath, 'utf8');
  },

  getFixture: function (filename) {
    return this.getFile(path.join('test/fixtures', filename));
  },

  getResult: function (filename) {
    return this.getFile(path.join('test/dist', filename));
  }
};
