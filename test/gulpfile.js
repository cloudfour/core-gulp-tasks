'use strict';

var gulp = require('gulp');
var tasks = require('../');

tasks.css(gulp, {
  src: './fixtures/input.css',
  dest: './dist'
});
